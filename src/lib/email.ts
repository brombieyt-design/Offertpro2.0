import nodemailer from "nodemailer";

// Uses environment variables for SMTP config.
// For testing without SMTP, falls back to a console log.
function getTransporter() {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || "587");
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  }

  // No SMTP configured — use ethereal (test) or just return null
  return null;
}

export async function sendEmail(options: {
  to: string;
  subject: string;
  html: string;
  attachments?: { filename: string; content: Buffer }[];
}): Promise<{ success: boolean; message: string }> {
  const transporter = getTransporter();

  if (!transporter) {
    // Log to console when no SMTP is configured
    console.log("=== EMAIL (no SMTP configured) ===");
    console.log(`To: ${options.to}`);
    console.log(`Subject: ${options.subject}`);
    console.log("Attachments:", options.attachments?.map((a) => a.filename).join(", ") || "none");
    console.log("==================================");
    return {
      success: true,
      message: "E-post loggad (SMTP ej konfigurerad). Konfigurera SMTP_HOST, SMTP_USER, SMTP_PASS i .env för att skicka riktiga e-postmeddelanden.",
    };
  }

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
      attachments: options.attachments,
    });
    return { success: true, message: "E-post skickad!" };
  } catch (err) {
    return { success: false, message: `Kunde inte skicka e-post: ${err}` };
  }
}
