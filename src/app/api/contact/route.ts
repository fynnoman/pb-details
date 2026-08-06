import { NextResponse } from "next/server";
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
  if (!secret) return true; // hCaptcha nicht konfiguriert → nicht blockieren
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

  // Honeypot
  if (data.website && data.website.length > 0) {
    return NextResponse.json({ ok: true }); // Bot bestätigen, aber nichts tun
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

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = process.env.SMTP_PORT
    ? Number(process.env.SMTP_PORT)
    : undefined;
  const smtpUser = process.env.SMTP_USER;
  const smtpPassword = process.env.SMTP_PASSWORD;
  const smtpFrom = process.env.SMTP_FROM ?? SITE.email;
  const contactTo = process.env.CONTACT_TO ?? SITE.email;

  if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Mail-Versand ist auf diesem Deployment noch nicht konfiguriert. Bitte kontaktieren Sie uns direkt telefonisch.",
      },
      { status: 503 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPassword },
  });

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
    await transporter.sendMail({
      from: smtpFrom,
      to: contactTo,
      replyTo: email,
      subject: `Neue Anfrage: ${firstname}${data.service ? ` – ${data.service}` : ""}`,
      text,
    });
  } catch (err) {
    console.error("[contact] sendMail failed", err);
    return NextResponse.json(
      { ok: false, error: "Versand fehlgeschlagen. Bitte später erneut versuchen." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
