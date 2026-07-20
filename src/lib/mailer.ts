import nodemailer from "nodemailer";
import config from "./env.export";
import { logger } from "./logger";

const transporter = nodemailer.createTransport({
  host: config.nodemailer.host,
  port: Number(config.nodemailer.port),
  auth: {
    user: config.nodemailer.username,
    pass: config.nodemailer.password,
  },
});

export async function resetPasswordEmail(url: string, to: string) {
  try {
    const info = await transporter.sendMail({
      from: "Finance Tracker <ftrack@mail.com>",
      to,
      subject: "Password Reset",
      html: getHtml(url), // HTML body
    });
    logger.info("Message sent: %s", info.messageId);

    return info;
    // Preview URL is only available when using an Ethereal test account
    // logger.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    logger.error("Error while sending mail");
    logger.error(JSON.stringify(err));
    throw err;
  }
}

function getHtml(url: string) {
  return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
      <h2 style="margin: 0 0 16px; font-size: 20px; color: #111827;">Finance Tracker</h2>
      <p style="font-size: 15px; line-height: 1.5; margin: 0 0 24px;">
        We received a request to reset your password. Click the button below to choose a new one — this link expires in 30 minutes.
      </p>
      <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: bold;">
        Reset Password
      </a>
      <p style="font-size: 13px; line-height: 1.5; color: #6b7280; margin: 24px 0 0;">
        If you didn't request this, you can safely ignore this email — your password won't change.
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin: 16px 0 0; word-break: break-all;">
        Or copy this link into your browser: ${url}
      </p>
    </div>`;
}
