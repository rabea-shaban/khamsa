import nodemailer, { Transporter } from 'nodemailer';
import { env } from '../../config/env.config';
import { IContactMessageDto } from './contact.types';
import { ApiError } from '../../utils/api-error';

export class ContactService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: env.SMTP_PORT,
      secure: env.SMTP_SECURE,
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS.replace(/\s+/g, ''),
      },
    });
  }

  async sendContactMessage(dto: IContactMessageDto): Promise<{ success: boolean; message: string }> {
    const formattedDate = new Date().toLocaleString('ar-EG', {
      timeZone: 'Africa/Cairo',
      dateStyle: 'full',
      timeStyle: 'medium',
    });

    const htmlContent = `
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0b0d13; color: #e2e8f0; margin: 0; padding: 20px; direction: rtl; }
    .container { max-width: 600px; margin: 0 auto; background-color: #12151e; border: 1px solid #2d3748; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #1e293b, #0f172a); padding: 24px; text-align: center; border-bottom: 2px solid #eab308; }
    .header h1 { color: #facc15; margin: 0; font-size: 22px; }
    .header p { color: #94a3b8; margin: 5px 0 0 0; font-size: 13px; }
    .body { padding: 24px; }
    .info-card { background-color: #1b202c; border: 1px solid #334155; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
    .info-row { margin-bottom: 10px; font-size: 14px; }
    .info-row:last-child { margin-bottom: 0; }
    .label { font-weight: bold; color: #facc15; margin-left: 8px; }
    .value { color: #ffffff; }
    .message-box { background-color: #0c0e14; border-right: 4px solid #facc15; padding: 16px; border-radius: 8px; font-size: 14px; line-height: 1.6; color: #f1f5f9; white-space: pre-wrap; }
    .footer { background-color: #0a0c10; padding: 16px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b; }
    .reply-btn { display: inline-block; background-color: #eab308; color: #000000; font-weight: bold; text-decoration: none; padding: 10px 20px; border-radius: 8px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>رسالة جديدة من تواصل معنا 📬</h1>
      <p>منصة خمسة برمجة بالبلدي</p>
    </div>
    <div class="body">
      <div class="info-card">
        <div class="info-row"><span class="label">👤 الاسم الكامل:</span> <span class="value">${dto.name}</span></div>
        <div class="info-row"><span class="label">✉️ البريد الإلكتروني:</span> <span class="value"><a href="mailto:${dto.email}" style="color: #60a5fa; text-decoration: none;">${dto.email}</a></span></div>
        <div class="info-row"><span class="label">📱 رقم الهاتف / واتساب:</span> <span class="value">${dto.phone ? `<a href="https://wa.me/${dto.phone.replace(/[^0-9]/g, '')}" style="color: #34d399; text-decoration: none;">${dto.phone}</a>` : 'غير محدد'}</span></div>
        <div class="info-row"><span class="label">🏷️ نوع الموضوع:</span> <span class="value">${dto.subject}</span></div>
        <div class="info-row"><span class="label">⏰ التوقيت:</span> <span class="value">${formattedDate}</span></div>
      </div>

      <h3 style="color: #facc15; margin-top: 20px; margin-bottom: 8px; font-size: 15px;">📝 نص الرسالة:</h3>
      <div class="message-box">${dto.message}</div>

      <div style="text-align: center; margin-top: 20px;">
        <a href="mailto:${dto.email}?subject=رد على: ${encodeURIComponent(dto.subject)}" class="reply-btn">
          ↩️ الرد المباشر على المرسل
        </a>
      </div>
    </div>
    <div class="footer">
      تم إرسال هذا الإشعار تلقائياً من خادم «خمسة برمجة بالبلدي» • ربيع شعبان
    </div>
  </div>
</body>
</html>
    `;

    try {
      await this.transporter.sendMail({
        from: `"خمسة برمجة بالبلدي" <${env.SMTP_USER}>`,
        to: env.CONTACT_RECEIVER_EMAIL,
        replyTo: `"${dto.name}" <${dto.email}>`,
        subject: `[تواصل جديد] ${dto.subject} - من: ${dto.name}`,
        text: `رسالة جديدة من: ${dto.name}\nالبريد: ${dto.email}\nالهاتف: ${dto.phone || 'غير محدد'}\nالموضوع: ${dto.subject}\n\nنص الرسالة:\n${dto.message}`,
        html: htmlContent,
      });

      return {
        success: true,
        message: 'تم إرسال رسالتك بنجاح إلى البريد الإلكتروني وسنقوم بالرد في أقرب وقت.',
      };
    } catch (err: unknown) {
      console.error('SMTP Send Error:', err);
      const errorMsg = err instanceof Error ? err.message : 'Failed to send email';
      throw ApiError.internal(`فشل في إرسال البريد الإلكتروني: ${errorMsg}`);
    }
  }
}

export const contactService = new ContactService();
