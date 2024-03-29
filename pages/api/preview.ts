import {
  apiVersion,
  dataset,
  previewSecretId,
  projectId,
} from 'libs/sanity.api'
import { resolveHref } from 'libs/sanity.links'
import type { NextApiRequest, NextApiResponse } from 'next'
import type { PageConfig } from 'next/types'
import { createClient } from 'next-sanity'
import { getSecret } from 'plugins/productionUrl/utils'
import { postBySlugQuery } from 'libs/sanity.queries'

// res.setPreviewData only exists in the nodejs runtime, setting the config here allows changing the global runtime
// option in next.config.mjs without breaking preview mode
export const config: PageConfig = { runtime: 'nodejs' }

function redirectToPreview(
  res: NextApiResponse<string | void>,
  previewData: { token?: string },
  Location: string
): void {
  // Enable Preview Mode by setting the cookies
  res.setPreviewData(previewData)
  // Redirect to a preview capable route
  // FIXME: https://github.com/sanity-io/nextjs-blog-cms-sanity-v3/issues/95
  // res.writeHead(307, { Location })
  res.writeHead(307, {
    Location: Location,
  })
  res.end()
}

// Fallback to using the WRITE token until https://www.sanity.io/docs/vercel-integration starts shipping a READ token.
// As this client only exists on the server and the token is never shared with the browser, we don't risk escalating permissions to untrustworthy users
const token =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_WRITE_TOKEN
const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
}).withConfig({ useCdn: false, token })

export default async function preview(
  req: NextApiRequest,
  res: NextApiResponse<string | void>
) {
  const previewData: { token?: string } = {}
  // If you want to require preview mode sessions to be started from the Studio, set the SANITY_REQUIRE_PREVIEW_SECRET
  // environment variable to 'true'. The benefit of doing this that unauthorized users attempting to brute force into your
  // preview mode won't make it past the secret check, and only legitimate users are able to bypass the statically generated pages and load up
  // the serverless-powered preview mode.
  if (
    process.env.SANITY_REQUIRE_PREVIEW_SECRET === 'true' &&
    !req.query.secret
  ) {
    return res.status(401).send('Invalid secret')
  }

  // If a secret is present in the URL, verify it and if valid we upgrade to token based preview mode, which works in Safari and Incognito mode
  if (req.query.secret) {
    if (!token) {
      throw new Error(
        'A secret is provided but there is no `SANITY_API_READ_TOKEN` environment variable setup.'
      )
    }
    const secret = await getSecret(client, previewSecretId)
    if (req.query.secret !== secret) {
      return res.status(401).send('Invalid secret')
    }
    previewData.token = token
  }

  // If no slug is provided open preview mode on the frontpage
  if (!req.query.slug) {
    return redirectToPreview(res, previewData, '/')
  }

  // Check if the post with the given `slug` exists
  const post = await client.fetch(postBySlugQuery, { slug: req.query.slug })

  // If the slug doesn't exist prevent preview mode from being enabled
  if (!post) {
    return res.status(401).send('Invalid slug')
  }

  const href = await resolveHref(
    req.query.documentType as string,
    req.query.slug as string
  )

  if (!href) {
    return res
      .status(400)
      .send(
        'Unable to resolve preview URL based on the current document type and slug'
      )
  }

  return redirectToPreview(res, previewData, href)
}
