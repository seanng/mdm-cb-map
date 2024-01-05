const SITE_URL = process.env.SITE_URL || 'https://cb-map.com'

// Save crawling budget by not fetching SSG meta files
const NEXT_SSG_FILES = [
  '/*.json$',
  '/*_buildManifest.js$',
  '/*_middlewareManifest.js$',
  '/*_ssgManifest.js$',
  '/*.js$',
]

/** @type {import('next-sitemap').IConfig} */
const config = {
  exclude: ['/404', '/studio*', '/api*', '/_next*', '/_error', '/_app'],
  siteUrl: SITE_URL,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: NEXT_SSG_FILES,
      },
    ],
  },
}

module.exports = config
