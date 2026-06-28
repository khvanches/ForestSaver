import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { generateCertificate } from "@/lib/certificate"

export async function POST(req: NextRequest) {
  const { name, email, phone, recipient, giftTitle, giftPrice } = await req.json()

  console.log(`[order] новая заявка: ${giftTitle} · ${giftPrice} | ${name} | ${email}`)

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn("[order] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — пропускаем отправку")
    return NextResponse.json({ ok: true })
  }

  const text = `🌲 Новая заявка на посадку: ${giftTitle} · ${giftPrice}`

  const tgBase = process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org"
  const res = await fetch(`${tgBase}/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(err => { console.error("[order] ошибка сети Telegram:", err); return null })

  if (res && !res.ok) {
    const body = await res.text()
    console.error(`[order] Telegram вернул ${res.status}: ${body}`)
  } else if (res?.ok) {
    console.log("[order] сообщение отправлено в Telegram")
  }

  const now = new Date()
  const certNumber =
    `${now.getFullYear()}` +
    `${String(now.getMonth() + 1).padStart(2, "0")}` +
    `${String(now.getDate()).padStart(2, "0")}` +
    `-${String(Math.floor(1000 + Math.random() * 9000))}`

  const pdfBuffer = await generateCertificate({
    recipient,
    certNumber,
    date: now.toLocaleDateString("ru-RU"),
  }).catch(err => { console.error("[order] ошибка генерации сертификата:", err); return null })

  await sendEmail(
    `Новая заявка: ${giftTitle} · Сертификат №${certNumber}`,
    `<p><b>${giftTitle} · ${giftPrice}</b></p>
     <p>Кому: ${recipient}</p>
     <p>Имя: ${name} | Почта: ${email} | Тел: ${phone}</p>`,
    pdfBuffer
      ? [{ filename: `certificate-${certNumber}.pdf`, content: pdfBuffer, contentType: "application/pdf" }]
      : undefined
  ).catch(err => console.error("[order] ошибка email:", err))

  return NextResponse.json({ ok: true })
}
