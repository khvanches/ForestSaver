import { PDFDocument, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import fs from "fs"
import path from "path"

interface CertData {
  recipient: string
  certNumber: string
  date: string
}

export async function generateCertificate(data: CertData): Promise<Buffer> {
  const templateBytes = fs.readFileSync(
    path.join(process.cwd(), "public/images/certificate-template.png")
  )
  const fontBytes = fs.readFileSync(
    path.join(process.cwd(), "public/fonts/Roboto-Regular.ttf")
  )

  const pdfDoc = await PDFDocument.create()
  pdfDoc.registerFontkit(fontkit)

  const font = await pdfDoc.embedFont(fontBytes)
  const bgImage = await pdfDoc.embedPng(templateBytes)

  const W = 841.89, H = 595.28
  const page = pdfDoc.addPage([W, H])
  page.drawImage(bgImage, { x: 0, y: 0, width: W, height: H })

  const lines: { text: string; size: number; y: number; color: ReturnType<typeof rgb> }[] = [
    { text: `№ ${data.certNumber}`, size: 14, y: 370, color: rgb(0.3, 0.3, 0.3) },
    { text: data.recipient,         size: 28, y: 320, color: rgb(0.13, 0.27, 0.13) },
    { text: "Смоленская область",   size: 16, y: 270, color: rgb(0.3, 0.3, 0.3) },
    { text: data.date,              size: 14, y: 230, color: rgb(0.3, 0.3, 0.3) },
  ]

  for (const line of lines) {
    const w = font.widthOfTextAtSize(line.text, line.size)
    page.drawText(line.text, {
      x: (W - w) / 2,
      y: line.y,
      size: line.size,
      font,
      color: line.color,
    })
  }

  return Buffer.from(await pdfDoc.save())
}
