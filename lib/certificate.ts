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

  const lineColor = rgb(0.25, 0.40, 0.20)
  const textGray  = rgb(0.38, 0.38, 0.38)
  const nameGreen = rgb(0.13, 0.27, 0.13)
  const lineLeft  = 130
  const lineRight = 710

  const drawOrnamentLine = (y: number) => {
    page.drawLine({ start: { x: lineLeft, y }, end: { x: W / 2 - 9, y }, thickness: 0.7, color: lineColor })
    page.drawCircle({ x: W / 2, y, size: 3, color: lineColor })
    page.drawLine({ start: { x: W / 2 + 9, y }, end: { x: lineRight, y }, thickness: 0.7, color: lineColor })
  }

  // верхняя линия
  drawOrnamentLine(338)

  // метка
  const label = "НАСТОЯЩИМ УДОСТОВЕРЯЕТСЯ, ЧТО"
  const labelSize = 9.5
  const labelW = font.widthOfTextAtSize(label, labelSize)
  page.drawText(label, { x: (W - labelW) / 2, y: 318, size: labelSize, font, color: textGray, characterSpacing: 1.8 })

  // имя получателя
  const nameSize = 28
  const nameW = font.widthOfTextAtSize(data.recipient, nameSize)
  page.drawText(data.recipient, { x: (W - nameW) / 2, y: 278, size: nameSize, font, color: nameGreen })

  // нижняя линия
  drawOrnamentLine(256)

  // дата (слева) и номер (справа)
  const metaSize = 11
  const numText = `№ ${data.certNumber}`
  const numW = font.widthOfTextAtSize(numText, metaSize)
  page.drawText(data.date, { x: lineLeft + 8, y: 234, size: metaSize, font, color: textGray })
  page.drawText(numText,   { x: lineRight - numW - 8, y: 234, size: metaSize, font, color: textGray })

  return Buffer.from(await pdfDoc.save())
}
