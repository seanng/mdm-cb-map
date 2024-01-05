import { Noto_Sans_TC } from '@next/font/google'
import Script from 'next/script'

import 'styles/tailwind.css'

const noto = Noto_Sans_TC({
  variable: '--font-sans',
  weight: ['400', '700'],
  subsets: ['chinese-traditional', 'latin'],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-TW" className={`${noto.variable} font-sans`}>
      <head />
      <body>
        <Script
          async
          defer
          crossOrigin="anonymous"
          src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v16.0&appId=513260735535266&autoLogAppEvents=1"
          nonce="wXTu8Z7n"
        />
        {children}
      </body>
    </html>
  )
}
