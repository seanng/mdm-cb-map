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
  const data: HomePagePayload = usePreview(token, homePageQuery)
  return <HomePage data={data}>{children}</HomePage>
}
