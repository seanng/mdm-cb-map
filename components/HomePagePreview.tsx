'use client'

import { usePreview } from 'libs/sanity.preview'
import { homePageQuery } from 'libs/sanity.queries'
import { ReactNode } from 'react'

import { HomePage } from './HomePage'

export function HomePagePreview({
  token,
  children,
}: {
  token: null | string
  children: ReactNode
}) {
  // Fetch DRAFT data to render on the page - that is data that is being edited in real-time.
  const data: HomePagePayload = usePreview(token, homePageQuery)
  return <HomePage data={data}>{children}</HomePage>
}
