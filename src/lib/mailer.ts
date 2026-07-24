import nodemailer from "nodemailer";
import config from "./env.export";
import { logger } from "./logger";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { round2 } from "../controllers/helper";

type SumAmountByCategory = {
  amount: number | null;
  categoryId: number | null;
  type: "EXPENSE" | "INCOME";
}[];

abstract class EmailService {
  protected transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.nodemailer.host,
      port: Number(config.nodemailer.port),
      auth: {
        user: config.nodemailer.username,
        pass: config.nodemailer.password,
      },
    });
  }
  abstract getHtml(): string;
  abstract emailSender(): Promise<SMTPTransport.SentMessageInfo>;
}

export class EmailReportingService extends EmailService {
  private email: string;
  private sumAmountByCategory: SumAmountByCategory;
  private totalIncome: number;
  private totalExpense: number;

  constructor(
    email: string,
    sumAmountByCategory: SumAmountByCategory,
    totalIncome: number,
    totalExpense: number
  ) {
    super();
    this.email = email;
    this.sumAmountByCategory = sumAmountByCategory;
    this.totalIncome = totalIncome;
    this.totalExpense = totalExpense;
  }
  getHtml(): string {
    const netBalance = round2(this.totalIncome - this.totalExpense);
    const rows = this.sumAmountByCategory
      .map(
        (s, i) => `
          <tr style="background-color: ${i % 2 === 0 ? "#ffffff" : "#f9fafb"};">
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${
              s.type
            }</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">${
              s.categoryId
            }</td>
            <td style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: right;">${round2(
              s.amount ?? 0
            )}€</td>
          </tr>`
      )
      .join("");

    return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
      <h2 style="margin: 0 0 4px; font-size: 20px; color: #111827;">Monthly Report</h2>
      <p style="margin: 0 0 24px; font-size: 13px; color: #6b7280;">${
        this.email
      }</p>

      <div style="margin-bottom: 24px;">
        <p style="margin: 0 0 6px; font-size: 15px;"><strong>Income:</strong> ${round2(
          this.totalIncome
        )}€</p>
        <p style="margin: 0 0 6px; font-size: 15px;"><strong>Expense:</strong> ${round2(
          this.totalExpense
        )}€</p>
        <p style="margin: 0; font-size: 15px; font-weight: bold;">Net Balance: ${netBalance}€</p>
      </div>

      <table style="border-collapse: collapse; width: 100%;">
        <tr style="background-color: #f3f4f6;">
          <th style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left;">Type</th>
          <th style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: left;">Category</th>
          <th style="padding: 8px 12px; border: 1px solid #e5e7eb; text-align: right;">Amount</th>
        </tr>
        ${rows}
      </table>
    </div>`;
  }
  async emailSender(): Promise<SMTPTransport.SentMessageInfo> {
    const html = this.getHtml();
    // return;
    try {
      const info = await this.transporter.sendMail({
        from: "Finance Tracker <ftrack@mail.com>",
        to: this.email,
        subject: "Monthly Transaction Reporting",
        html, // HTML body
      });
      logger.info("Message sent: %s", info.messageId);

      return info;
    } catch (err) {
      logger.error("Error while sending mail");
      logger.error(JSON.stringify(err));
      throw err;
    }
  }
}

export class ResetPasswordEmailService extends EmailService {
  private resetUrl: string;
  private email: string;

  constructor(url: string, email: string) {
    super();
    this.resetUrl = url;
    this.email = email;
  }
  getHtml(): string {
    return `
    <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 24px; color: #1f2937;">
      <h2 style="margin: 0 0 16px; font-size: 20px; color: #111827;">Finance Tracker</h2>
      <p style="font-size: 15px; line-height: 1.5; margin: 0 0 24px;">
        We received a request to reset your password. Click the button below to choose a new one — this link expires in 30 minutes.
      </p>
      <a href="${this.resetUrl}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 15px; font-weight: bold;">
        Reset Password
      </a>
      <p style="font-size: 13px; line-height: 1.5; color: #6b7280; margin: 24px 0 0;">
        If you didn't request this, you can safely ignore this email — your password won't change.
      </p>
      <p style="font-size: 12px; color: #9ca3af; margin: 16px 0 0; word-break: break-all;">
        Or copy this link into your browser: ${this.resetUrl}
      </p>
    </div>`;
  }
  async emailSender(): Promise<SMTPTransport.SentMessageInfo> {
    const html = this.getHtml();
    try {
      const info = await this.transporter.sendMail({
        from: "Finance Tracker <ftrack@mail.com>",
        to: this.email,
        subject: "Password Reset",
        html, // HTML body
      });
      logger.info("Message sent: %s", info.messageId);

      return info;
    } catch (err) {
      logger.error("Error while sending mail");
      logger.error(JSON.stringify(err));
      throw err;
    }
  }
}

export class EmailVerificationService extends EmailService {
  constructor() {
    super();
  }
  getHtml(): string {
    throw new Error("Method not implemented.");
  }
  async emailSender(): Promise<SMTPTransport.SentMessageInfo> {
    throw new Error("Method not implemented.");
  }
}
