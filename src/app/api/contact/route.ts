import { NextResponse } from "next/server";
import { Resend } from "resend";
import nodemailer from "nodemailer";
import { SITE } from "@/lib/site";
import { clientKey, rateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Payload = {
  firstname?: string;
  email?: string;
  phone?: string;
  vehicle?: string;
  service?: string;
  message?: string;
  hcaptchaToken?: string;
  /** Honeypot */
  website?: string;
};

const MAX_MESSAGE_LEN = 4000;

function badRequest(message: string) {
  return NextResponse.json({ ok: false, error: message }, { status: 400 });
}

async function verifyHcaptcha(token: string | undefined): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  const res = await fetch("https://hcaptcha.com/siteverify", {
    method: "POST",
    body,
    headers: { "content-type": "application/x-www-form-urlencoded" },
  });
  const json = (await res.json()) as { success?: boolean };
  return json.success === true;
}

/**
 * Sendet die Mail entweder via Resend (bevorzugt, wenn RESEND_API_KEY
 * gesetzt ist) oder als Fallback via SMTP/nodemailer (Office 365 etc.).
 * Wirft bei Fehler, damit die Route eine sinnvolle Antwort schicken kann.
 */
async function sendMail(opts: {
  from: string;
  to: string;
  replyTo: string;
  subject: string;
  text: string;
}) {
  const resendKey = process.env.RESEND_API_KEY;

  if (resendKey) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from: opts.from,
      to: [opts.to],
      replyTo: opts.replyTo,
      subject: opts.subject,
      text: opts.text,
    });
    if (error) {
      throw new Error(`Resend: ${error.message ?? "unknown error"}`);
    }
    return;
  }

  // Fallback: SMTP über nodemailer
  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD ?? process.env.SMTP_PASS;
  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
    throw new Error("Kein Mail-Provider konfiguriert (RESEND_API_KEY oder SMTP_*).");
  }
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPassword },
  });
  await transporter.sendMail(opts);
}

export async function POST(req: Request) {
  const limit = rateLimit(clientKey(req), 5, 60 * 60 * 1000);
  if (!limit.ok) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Zu viele Anfragen von dieser Adresse. Bitte versuchen Sie es später erneut oder rufen Sie uns direkt an.",
      },
      {
        status: 429,
        headers: limit.retryAfterSec
          ? { "Retry-After": String(limit.retryAfterSec) }
          : undefined,
      },
    );
  }

  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return badRequest("Ungültige Anfrage.");
  }

  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true });
  }

  const firstname = (data.firstname ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();

  if (!firstname) return badRequest("Bitte Vornamen angeben.");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return badRequest("Bitte gültige E-Mail-Adresse angeben.");
  if (!message) return badRequest("Bitte Nachricht angeben.");
  if (message.length > MAX_MESSAGE_LEN)
    return badRequest("Nachricht ist zu lang.");

  const captchaOk = await verifyHcaptcha(data.hcaptchaToken);
  if (!captchaOk)
    return badRequest("Spam-Prüfung fehlgeschlagen. Bitte erneut versuchen.");

  const from = process.env.MAIL_FROM ?? process.env.SMTP_FROM ?? `no-reply@pb-fahrzeugpflege.de`;
  const to = process.env.CONTACT_TO ?? SITE.email;

  const hasProvider = process.env.RESEND_API_KEY || process.env.SMTP_HOST;
  if (!hasProvider) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Mail-Versand ist auf diesem Deployment noch nicht konfiguriert. Bitte kontaktieren Sie uns direkt telefonisch.",
      },
      { status: 503 },
    );
  }

  const text = [
    `Neue Anfrage über die Website ${SITE.domain}`,
    "",
    `Vorname: ${firstname}`,
    `E-Mail: ${email}`,
    data.phone ? `Telefon: ${data.phone}` : null,
    data.vehicle ? `Fahrzeug: ${data.vehicle}` : null,
    data.service ? `Gewünschte Leistung: ${data.service}` : null,
    "",
    "Nachricht:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await sendMail({
      from,
      to,
      replyTo: email,
      subject: `Neue Anfrage: ${firstname}${data.service ? ` – ${data.service}` : ""}`,
      text,
    });
  } catch (err) {
    console.error("[contact] sendMail failed", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Versand fehlgeschlagen. Bitte später erneut versuchen oder direkt telefonisch.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
