import { PDFDocument, rgb } from "pdf-lib"
import fontkit from "@pdf-lib/fontkit"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import { execSync } from "child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, "..")

async function generateCertificate({ recipient, certNumber, date }) {
  const templateBytes = fs.readFileSync(path.join(root, "public/images/certificate-template.png"))
  const fontBytes = fs.readFileSync(path.join(root, "public/fonts/Roboto-Regular.ttf"))

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

  const drawOrnamentLine = (y) => {
    page.drawLine({ start: { x: lineLeft, y }, end: { x: W / 2 - 9, y }, thickness: 0.7, color: lineColor })
    page.drawCircle({ x: W / 2, y, size: 3, color: lineColor })
    page.drawLine({ start: { x: W / 2 + 9, y }, end: { x: lineRight, y }, thickness: 0.7, color: lineColor })
  }

  drawOrnamentLine(338)

  const label = "НАСТОЯЩИМ УДОСТОВЕРЯЕТСЯ, ЧТО"
  const labelSize = 9.5
  const labelW = font.widthOfTextAtSize(label, labelSize)
  page.drawText(label, { x: (W - labelW) / 2, y: 318, size: labelSize, font, color: textGray, characterSpacing: 1.8 })

  const nameSize = 28
  const nameW = font.widthOfTextAtSize(recipient, nameSize)
  page.drawText(recipient, { x: (W - nameW) / 2, y: 278, size: nameSize, font, color: nameGreen })

  drawOrnamentLine(256)

  const metaSize = 11
  const numText = `№ ${certNumber}`
  const numW = font.widthOfTextAtSize(numText, metaSize)
  page.drawText(date, { x: lineLeft + 8, y: 234, size: metaSize, font, color: textGray })
  page.drawText(numText, { x: lineRight - numW - 8, y: 234, size: metaSize, font, color: textGray })

  return Buffer.from(await pdfDoc.save())
}

const buf = await generateCertificate({
  recipient: "Александр Петров",
  certNumber: "20260620-4271",
  date: "20 июня 2026 г.",
})

const outPath = path.join(root, "scripts/test-output.pdf")
fs.writeFileSync(outPath, buf)
console.log("PDF сохранён:", outPath)
execSync(`open "${outPath}"`)
