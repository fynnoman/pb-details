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

type MailContent = {
  fromDisplay: string;
  replyTo: string;
  subject: string;
  text: string;
  fields: {
    Vorname: string;
    "E-Mail": string;
    Telefon?: string;
    Fahrzeug?: string;
    Leistung?: string;
    Nachricht: string;
  };
};

/**
 * Sendet die Mail — Priorität:
 *   1. Formsubmit (kein DNS/Auth nötig, ideal für schnelle Prod)
 *   2. Resend (verifizierte Absender-Domain nötig)
 *   3. SMTP/nodemailer (Office 365, Postmark etc.)
 */
async function sendMail(mc: MailContent, originUrl: string) {
  const formsubmitEmail = process.env.FORMSUBMIT_EMAIL;
  const resendKey = process.env.RESEND_API_KEY;
  const smtpHost = process.env.SMTP_HOST;

  // 1. Formsubmit (bevorzugt, wenn gesetzt)
  if (formsubmitEmail) {
    const res = await fetch(
      `https://formsubmit.co/ajax/${encodeURIComponent(formsubmitEmail)}`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
          origin: originUrl,
          referer: originUrl,
        },
        body: JSON.stringify({
          _subject: mc.subject,
          _replyto: mc.replyTo,
          _template: "table",
          _captcha: "false",
          _url: originUrl,
          ...mc.fields,
        }),
      },
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      throw new Error(`Formsubmit HTTP ${res.status}: ${body}`);
    }
    const json = (await res.json().catch(() => ({}))) as {
      success?: boolean | string;
      message?: string;
    };
    if (json.success !== true && json.success !== "true") {
      throw new Error(
        `Formsubmit: ${json.message ?? "unbekannter Fehler (evtl. Aktivierung fehlt)"}`,
      );
    }
    return;
  }

  const to = process.env.CONTACT_TO ?? SITE.email;
  const from =
    process.env.MAIL_FROM ?? process.env.SMTP_FROM ?? `no-reply@${new URL(SITE.domain).hostname}`;

  // 2. Resend
  if (resendKey) {
    const resend = new Resend(resendKey);
    const { error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: mc.replyTo,
      subject: mc.subject,
      text: mc.text,
    });
    if (error) throw new Error(`Resend: ${error.message ?? "unknown error"}`);
    return;
  }

  // 3. SMTP-Fallback
  if (smtpHost) {
    const smtpPort = process.env.SMTP_PORT
      ? Number(process.env.SMTP_PORT)
      : undefined;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD ?? process.env.SMTP_PASS;
    if (!smtpPort || !smtpUser || !smtpPassword) {
      throw new Error("SMTP-Konfiguration unvollständig.");
    }
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });
    await transporter.sendMail({
      from,
      to,
      replyTo: mc.replyTo,
      subject: mc.subject,
      text: mc.text,
    });
    return;
  }

  throw new Error("Kein Mail-Provider konfiguriert.");
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

  const hasProvider =
    process.env.FORMSUBMIT_EMAIL ||
    process.env.RESEND_API_KEY ||
    process.env.SMTP_HOST;
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

  const phone = (data.phone ?? "").trim();
  const vehicle = (data.vehicle ?? "").trim();
  const service = (data.service ?? "").trim();

  const text = [
    `Neue Anfrage über die Website ${SITE.domain}`,
    "",
    `Vorname: ${firstname}`,
    `E-Mail: ${email}`,
    phone ? `Telefon: ${phone}` : null,
    vehicle ? `Fahrzeug: ${vehicle}` : null,
    service ? `Gewünschte Leistung: ${service}` : null,
    "",
    "Nachricht:",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const originHeader = req.headers.get("origin") ?? req.headers.get("referer");
  const originUrl = originHeader ?? SITE.domain;

  try {
    await sendMail(
      {
        fromDisplay: `${firstname} <${email}>`,
        replyTo: email,
        subject: `Neue Anfrage: ${firstname}${service ? ` – ${service}` : ""}`,
        text,
        fields: {
          Vorname: firstname,
          "E-Mail": email,
          ...(phone ? { Telefon: phone } : {}),
          ...(vehicle ? { Fahrzeug: vehicle } : {}),
          ...(service ? { Leistung: service } : {}),
          Nachricht: message,
        },
      },
      originUrl,
    );
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
