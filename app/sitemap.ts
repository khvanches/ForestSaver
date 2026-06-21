import { MetadataRoute } from "next"

const base = "https://podariles.ru"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base,                          lastModified: new Date(), changeFrequency: "monthly", priority: 1.0 },
    { url: `${base}/dying-forests`,       lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/oferta`,              lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${base}/privacy`,             lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ]
}
