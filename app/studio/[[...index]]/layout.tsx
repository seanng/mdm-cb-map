import 'styles/tailwind.css'
import { Noto_Sans_TC } from '@next/font/google'

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
      <body>{children}</body>
    </html>
  )
}
