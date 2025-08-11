import nodemailer from "nodemailer";

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER!,
      to,
      subject,
      html,
    });

    return {
        success: true,
        message: "Email sent successfully",
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return {
        success: false,
        message: "Failed to send email",
    }
  }
}
