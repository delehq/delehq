import "server-only";
import nodemailer from "nodemailer";

// GMAIL_USER / GMAIL_APP_PASSWORD are optional (see .env.local.example) —
// notification email is a nice-to-have on top of the contact form, not a
// requirement for it to work, so this returns null rather than throwing
// when they're unset.
function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export async function sendContactNotification({
  to,
  name,
  email,
  message,
}: {
  to: string;
  name: string;
  email: string;
  message: string;
}) {
  const transporter = getTransporter();
  if (!transporter) return;

  await transporter.sendMail({
    from: `"deledev.com" <${process.env.GMAIL_USER}>`,
    to,
    // Lets the recipient just hit "Reply" in their email client to respond
    // straight to the visitor, instead of copying the address out by hand.
    replyTo: email,
    subject: `New message from ${name} — deledev.com`,
    text: `${message}\n\n—\n${name} <${email}>`,
  });
}
