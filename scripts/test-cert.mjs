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

  const nameGreen = rgb(0.13, 0.27, 0.13)
  const textDark  = rgb(0.20, 0.20, 0.20)

  const nameSize = 42
  const nameW = font.widthOfTextAtSize(recipient, nameSize)
  page.drawText(recipient, { x: (W - nameW) / 2, y: 318, size: nameSize, font, color: nameGreen })

  page.drawText(date,        { x: 255, y: 200, size: 11, font, color: textDark })
  page.drawText(certNumber,  { x: 490, y: 200, size: 11, font, color: textDark })

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
