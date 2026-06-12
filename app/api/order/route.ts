import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  const { name, email, phone, recipient, giftTitle, giftPrice } = await req.json()

  console.log(`[order] новая заявка: ${giftTitle} · ${giftPrice} | ${name} | ${email}`)

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID

  if (!token || !chatId) {
    console.warn("[order] TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы — пропускаем отправку")
    return NextResponse.json({ ok: true })
  }

  const text =
    `🌲 <b>Новая заявка на посадку</b>\n\n` +
    `🎁 <b>Подарок:</b> ${giftTitle} · ${giftPrice}\n` +
    `👤 <b>Кому:</b> ${recipient}\n` +
    `📝 <b>Имя:</b> ${name}\n` +
    `📧 <b>Почта:</b> ${email}\n` +
    `📱 <b>Телефон:</b> ${phone}`

  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
  }).catch(err => { console.error("[order] ошибка сети Telegram:", err); return null })

  if (res && !res.ok) {
    const body = await res.text()
    console.error(`[order] Telegram вернул ${res.status}: ${body}`)
  } else if (res?.ok) {
    console.log("[order] сообщение отправлено в Telegram")
  }

  return NextResponse.json({ ok: true })
}
