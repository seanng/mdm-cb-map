const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environment variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  // when `next build` or `npm run build` is used
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  const env = {
    API_URL: (() => {
      if (isDev) return 'http://localhost:3000'
      if (isProd) return 'https://cb-map.com'
      if (isStaging) return 'https://staging.my-app.com'
      return 'API_URL:not (isDev,isProd && !isStaging,isProd && isStaging)'
    })(),
  }

  async function headers() {
    const headers = []
    if (!isProd || process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      })
    }
    return headers
  }

  return {
    images: {
      dangerouslyAllowSVG: true,
      remotePatterns: [
        { hostname: 'cdn.sanity.io' },
        { hostname: 'source.unsplash.com' },
      ],
    },
    reactStrictMode: true,
    experimental: {
      appDir: true,
    },
    env,
    headers,
    async rewrites() {
      // https://betterprogramming.pub/unblocking-google-analytics-with-next-js-46b5f18b29b3
      return [
        {
          source: '/stat/:region',
          destination: 'https://:region.google-analytics.com/g/collect',
        },
        {
          source: '/0223',
          destination:
            '/?utm_source=line&utm_medium=referral&utm_campaign=0223',
        },
      ]
    },
  }
}
