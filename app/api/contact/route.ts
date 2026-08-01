import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json(
        { error: "Missing required fields: email, subject, and message are required." },
        { status: 400 }
      );
    }

    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "needprojects123@gmail.com";
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;
    const toEmail = process.env.TO_EMAIL || "needprojects123@gmail.com";
    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpSecure = process.env.SMTP_SECURE !== "false";

    if (!smtpPass) {
      console.warn("SMTP_PASS / GMAIL_APP_PASSWORD is missing in .env.local");
      return NextResponse.json(
        {
          error: "Email service authentication missing. Please add GMAIL_APP_PASSWORD or SMTP_PASS to .env.local",
          requiresConfig: true
        },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"${name || 'Portfolio Visitor'}" <${smtpUser}>`,
      to: toEmail,
      replyTo: email,
      subject: `[Portfolio Inquiry] ${subject}`,
      text: `Name: ${name || 'N/A'}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #0b0b0f; color: #ffffff; padding: 24px; border-radius: 8px; border: 1px solid #222230;">
          <h2 style="color: #4f8cff; border-bottom: 1px solid #222230; padding-bottom: 12px; margin-top: 0;">New Project Inquiry Received</h2>
          <p><strong>Sender Name:</strong> ${name || "N/A"}</p>
          <p><strong>Sender Email:</strong> <a href="mailto:${email}" style="color: #4f8cff;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="background-color: #12121e; border-left: 4px solid #4f8cff; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; color: #d1d5db;">${message}</p>
          </div>
          <hr style="border: none; border-top: 1px solid #222230; margin: 24px 0;" />
          <p style="font-size: 11px; color: #6b7280; font-family: monospace;">Sent via Devadevan Portfolio Engagement Portal to ${toEmail}</p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Transmission received and logged." });
  } catch (error: any) {
    console.error("Error sending contact email:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to transmit message payload." },
      { status: 500 }
    );
  }
}
