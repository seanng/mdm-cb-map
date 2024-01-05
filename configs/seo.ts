/** @source https://github.com/garmeeh/next-seo#nextseo-options */

import { NextSeoProps } from 'next-seo'

export const title = '台灣跨境地圖 cb-map.com'

const defaultTitle = `${title} | 跨境導航 跨境指南 出海門戶`
const description =
  'CB-Map 跨境地圖 (Cross-Border Map) 專注為台灣跨境電商從業人員提供資訊整合的平台，藉由讓台灣商家出海更便捷。始終圍繞商家需求，提供最實用的跨境工具、跨境資訊、跨境乾貨、跨境服務等。'
const url = 'https://cb-map.com'

export const nextSeoDefault: NextSeoProps = {
  defaultTitle,
  description,
  titleTemplate: `${title} | %s`,
  canonical: url,
  openGraph: {
    type: 'website',
    title,
    url,
    description,
    images: [
      {
        url: `${url}/og-image.png`,
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'OG Image',
      },
    ],
  },
}
