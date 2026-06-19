import { NextRequest, NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  console.log(`[contact] новая заявка на помощь лесу | ${name} | ${email}`)

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn("[contact] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — пропускаем отправку")
    return NextResponse.json({ ok: true })
  }

  const text = `🌿 Новое обращение: ${name}`

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  }).catch(err => { console.error("[contact] ошибка сети Telegram:", err); return null })

  if (res && !res.ok) {
    const body = await res.text()
    console.error(`[contact] Telegram вернул ${res.status}: ${body}`)
  } else if (res?.ok) {
    console.log("[contact] сообщение отправлено в Telegram")
  }

  await sendEmail(
    `Новое обращение от ${name}`,
    `<p>Имя: ${name} | Почта: ${email} | Тел: ${phone}</p>
     <p>${message}</p>`
  ).catch(err => console.error("[contact] ошибка email:", err))

  return NextResponse.json({ ok: true })
}
