'use client'

import { urlForImage } from 'libs/sanity.image'
import Image from 'next/image'
import { ModuleHeaderText } from './ModuleHeaderText'
import { RelativeDate } from 'components/RelativeDate'
import Link from 'next/link'
import clsx from 'clsx'
import { useSection } from 'hooks/useSection'
import { NEWS_SECTION_KEY } from 'constants/index'
import { SectionScrollOffset } from 'components/SectionScrollOffset'

function SectionHeader() {
  return (
    <div className="overflow-hidden pl-7">
      <div className="py-2">
        <ModuleHeaderText value="跨境資訊" bold />
      </div>
    </div>
  )
}

function LanguageBadge({ language }: { language?: NewsPublicationLanguage }) {
  const commonClasses = 'inline-flex items-center text-xs font-medium'

  const langColors = {
    tw: 'text-green-600',
    en: 'text-blue-600',
    cn: 'text-red-600',
  }

  const langNames = {
    tw: '繁',
    cn: '簡',
    en: '英',
  }

  if (!language) return <span />

  return (
    <span className={clsx(commonClasses, langColors[language])}>
      {langNames[language]}
    </span>
  )
}

function ArticleContent({ article }: { article: NewsArticlePayload }) {
  return (
    <div>
      <h3 className="text-gray-800 text-sm line-clamp-2 max-w-full group-hover:text-blue-500 group-hover:underline">
        {article?.title}
      </h3>
      <div className="flex space-x-2 w-full text-xs text-gray-500 mt-2 items-center">
        <RelativeDate dateString={article?.date} />
        <LanguageBadge language={article?.publication?.language} />
        <h5>{article?.publication?.name}</h5>
      </div>
    </div>
  )
}

const COVER_IMAGE_WIDTH = 272
const COVER_IMAGE_HEIGHT = COVER_IMAGE_WIDTH / 2

function ShowcaseArticle({ article }: { article: NewsArticlePayload }) {
  return (
    <div className="hidden lg:block lg:w-72 lg:pr-4 flex-auto group">
      <Link href={article?.url ?? 'https://cb-map.com'} target="_blank">
        <div className="flex flex-col justify-center">
          <div
            className="relative w-full max-w-sm mb-2"
            style={{ height: COVER_IMAGE_HEIGHT }}
          >
            <Image
              alt={article?.title ?? 'Article'}
              fill
              src={
                article?.coverImage?.asset?._ref
                  ? urlForImage(article.coverImage)
                      ?.width(COVER_IMAGE_WIDTH)
                      .height(COVER_IMAGE_HEIGHT)
                      .fit('crop')
                      .auto('format')
                      .url()
                  : `https://source.unsplash.com/${COVER_IMAGE_WIDTH}x${COVER_IMAGE_HEIGHT}/?article`
              }
              className="mb-2 rounded-md"
            />
          </div>
          <ArticleContent article={article} />
        </div>
      </Link>
    </div>
  )
}

interface NewsSectionProps {
  articles: NewsArticlePayload[]
  navIdx: number
}

export function NewsSection({ articles, navIdx }: NewsSectionProps) {
  const { ref } = useSection(navIdx)
  const latestArticle = articles[0]
  const seventhArticle = articles[6]
  return (
    <section className="relative rounded-md bg-white divide-y" ref={ref}>
      <SectionScrollOffset id={NEWS_SECTION_KEY} />
      <SectionHeader />
      <div className="px-4 py-3 flex space-x-4">
        {latestArticle && <ShowcaseArticle article={latestArticle} />}
        <div className="flex flex-col sm:grid sm:flex-auto sm:grid-cols-2 sm:grid-rows-3 sm:grid-flow-col gap-5">
          {latestArticle && (
            <Link
              className="lg:hidden group"
              href={latestArticle?.url ?? 'https://cb-map.com'}
              target="_blank"
            >
              <ArticleContent article={latestArticle} />
            </Link>
          )}
          {articles.length > 2 &&
            articles.slice(1, 6).map((article, i) => (
              <Link
                key={i}
                href={article?.url ?? 'https://cb-map.com'}
                target="_blank"
                className="group"
              >
                <ArticleContent article={article} />
              </Link>
            ))}
          {seventhArticle && (
            <Link
              className="hidden lg:block group"
              href={seventhArticle?.url ?? 'https://cb-map.com'}
              target="_blank"
            >
              <ArticleContent article={seventhArticle} />
            </Link>
          )}
          {articles.length > 7 &&
            articles.slice(7, 10).map((article, i) => (
              <Link
                className="hidden 2xl:block group"
                key={i}
                href={article?.url ?? 'https://cb-map.com'}
                target="_blank"
              >
                <ArticleContent article={article} />
              </Link>
            ))}
        </div>
      </div>
    </section>
  )
}
