import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: "smtp.mail.ru",
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface Attachment {
  filename: string
  content: Buffer
  contentType: string
}

export async function sendEmail(subject: string, html: string, attachments?: Attachment[]) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn("[email] SMTP_USER или SMTP_PASS не заданы — пропускаем")
    return
  }
  await transporter.sendMail({
    from: `"ЛесВозрождение" <${process.env.SMTP_USER}>`,
    to: process.env.SMTP_USER,
    subject,
    html,
    attachments,
  })
}
