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

  const nameGreen = rgb(0.13, 0.27, 0.13)
  const textDark  = rgb(0.20, 0.20, 0.20)

  const nameSize = 42
  const nameW = font.widthOfTextAtSize(data.recipient, nameSize)
  page.drawText(data.recipient, { x: (W - nameW) / 2, y: 318, size: nameSize, font, color: nameGreen })

  page.drawText(data.date, { x: 255, y: 200, size: 11, font, color: textDark })
  page.drawText(data.certNumber, { x: 490, y: 200, size: 11, font, color: textDark })

  return Buffer.from(await pdfDoc.save())
}
