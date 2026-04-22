import { MetadataRoute } from 'next'

const BASE_URL = 'https://toolyfy.in'

const tools = [
  'json-formatter',
  'csv-formatter',
  'cron-builder',
  'gst-calculator',
  'color-palette',
  'invoice-maker',
  'password-generator',
  'image-compressor',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPages = tools.map((slug) => ({
    url: `${BASE_URL}/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    ...toolPages,
  ]
}
