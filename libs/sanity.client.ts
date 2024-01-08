import 'server-only'
import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from 'libs/sanity.api'
import { homePageQuery } from './sanity.queries'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const sanityClient = (token?: string) => {
  return projectId
    ? createClient({
        projectId,
        dataset,
        apiVersion,
        // make sure vercel does not use cached version of the data on fetch
        useCdn: false,
        token,
      })
    : null
}

export async function getHomePage({
  token,
}: {
  token?: string
}): Promise<HomePagePayload | undefined> {
  return await sanityClient(token)?.fetch(homePageQuery)
}
