import { previewData } from 'next/headers'
import { notFound } from 'next/navigation'

import { getHomePage } from 'libs/sanity.client'

import { PreviewSuspense } from 'components/PreviewSuspense'
import { HomePage } from 'components/HomePage'
import { HomePagePreview } from 'components/HomePagePreview'
import { ForexRatesSection } from 'components/ForexRatesSection'

// Import global stylesheets for the app
import 'swiper/swiper.min.css'
import 'styles/swiper.css'

/**
 * When the browser visits the root path of the app, this Server Component will be rendered.
 * Since it is server-side, it has access to request data from the client.
 */
export default async function IndexPage() {
  // The preview token is passed in the request header when the request is from the CMS's Preview UI.
  const token = previewData().token || null
  // Get the data from Sanity's Content Lake to render the page
  const data = await getHomePage({ token })

  // If there is no data or token, return a 404 page.
  if (!data && !token) {
    notFound()
  }

  /**
   * Server Components must be rendered server-side, before being passed to the client.
   * @see https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#supported-pattern-passing-server-components-to-client-components-as-props
   */
  const serverComponents = (
    <>
      {/* @ts-ignore Server Component */}
      <ForexRatesSection />
    </>
  )

  // Render the HomePagePreview component if the request is from the CMS's Preview UI.
  return token ? (
    <PreviewSuspense>
      <HomePagePreview token={token}>{serverComponents}</HomePagePreview>
    </PreviewSuspense>
  ) : (
    <HomePage data={data}>{serverComponents}</HomePage>
  )
}
