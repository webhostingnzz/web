import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const name = String(body?.name || '').trim();
    const email = String(body?.email || '').trim();
    const subject = String(body?.subject || '').trim();
    const message = String(body?.message || '').trim();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPassword = process.env.SMTP_PASSWORD;

    if (!smtpHost || !smtpPort || !smtpUser || !smtpPassword) {
      console.error('Contact form error: SMTP environment variables are not fully configured');
      return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
    }

    const port = parseInt(smtpPort, 10);
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure: port === 465,
      auth: { user: smtpUser, pass: smtpPassword },
    });

    await transporter.sendMail({
      from: `"Webhosting NZ Contact Form" <${smtpUser}>`,
      to: 'admin@webhosting.co.nz',
      replyTo: email,
      subject: `Contact form: ${subject}`,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}
