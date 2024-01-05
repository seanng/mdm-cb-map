import { NextSeo } from 'next-seo'
import { nextSeoDefault } from 'configs/seo'
import { GoogleAnalytics } from 'libs/google-analytics'

export default async function Head() {
  return (
    <>
      <GoogleAnalytics
        strategy="lazyOnload"
        trackPageViews={{ ignoreHashChange: true }}
        gtagUrl={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
      />
      <NextSeo {...nextSeoDefault} useAppDir />
      <meta content="width=device-width, initial-scale=1" name="viewport" />
    </>
  )
}
