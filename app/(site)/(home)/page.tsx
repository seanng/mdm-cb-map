import { previewData } from 'next/headers'
import { notFound } from 'next/navigation'

import { getHomePage } from 'libs/sanity.client'

import { PreviewSuspense } from 'components/PreviewSuspense'
import { HomePage } from 'components/HomePage'
import { HomePagePreview } from 'components/HomePagePreview'
import { ForexRatesSection } from 'components/ForexRatesSection'

import 'swiper/swiper.min.css'
import 'styles/swiper.css'

export default async function IndexPage() {
  const token = previewData().token || null
  const data = await getHomePage({ token })

  if (!data && !token) {
    notFound()
  }

  const serverComponents = (
    <>
      {/* @ts-ignore Server Component */}
      <ForexRatesSection />
    </>
  )

  return token ? (
    <PreviewSuspense>
      <HomePagePreview token={token}>{serverComponents}</HomePagePreview>
    </PreviewSuspense>
  ) : (
    <HomePage data={data}>{serverComponents}</HomePage>
  )
}
