import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { name, email, phone, message } = await req.json()

  console.log(`[contact] новая заявка на помощь лесу | ${name} | ${email}`)

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn("[contact] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — пропускаем отправку")
    return NextResponse.json({ ok: true })
  }

  const text =
    `🌿 <b>Заявка на помощь лесу</b>\n\n` +
    `📝 <b>Имя:</b> ${name}\n` +
    `📧 <b>Почта:</b> ${email}\n` +
    `📱 <b>Телефон:</b> ${phone}\n` +
    `💬 <b>Как может помочь:</b>\n${message}`

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  }).catch(err => { console.error("[contact] ошибка сети Telegram:", err); return null })

  if (res && !res.ok) {
    const body = await res.text()
    console.error(`[contact] Telegram вернул ${res.status}: ${body}`)
  } else if (res?.ok) {
    console.log("[contact] сообщение отправлено в Telegram")
  }

  return NextResponse.json({ ok: true })
}
