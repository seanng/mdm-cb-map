'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useState } from 'react'
import { urlForImage } from 'libs/sanity.image'
import { ModuleHeaderText } from './ModuleHeaderText'
import { useSection } from 'hooks/useSection'
import { SectionScrollOffset } from 'components/SectionScrollOffset'

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: ModulePayload
  navIdx?: number
}

const gridCols = {
  four: 'grid grid-cols-2 lg:grid-cols-4 gap-1 px-2',
  five: 'grid grid-cols-2 lg:grid-cols-5 gap-1 px-2',
  six: 'grid grid-cols-2 lg:grid-cols-6 gap-1 px-2',
  seven: 'grid grid-cols-2 lg:grid-cols-7 gap-1 px-2',
  nine: 'grid grid-cols-2 lg:grid-cols-9 gap-1 px-2',
}

const placeholderData: ModulePayload = {
  _key: 'placeholder',
  title: 'Placeholder',
  columns: 'seven',
  tabs: [],
  shouldBoldLinkTitles: false,
}

export function ModuleSection({
  data = placeholderData,
  navIdx,
  ...props
}: Props) {
  const { ref } = useSection(navIdx)
  const [activeTabIdx, setActiveTabIdx] = useState(0)
  const { columns, tabs, shouldBoldLinkTitles, adTitle, adUrl } = data

  const sectionClass = 'relative rounded-md bg-white divide-y'
  const gridClass = gridCols[columns]

  const logoWidth = columns === 'nine' ? 16 : 26
  const logoMargin = columns === 'nine' ? 5 : 10

  if (tabs.length === 0) {
    return <section className={sectionClass} />
  }

  return (
    <section className={sectionClass} ref={ref} {...props}>
      {navIdx !== undefined && <SectionScrollOffset id={data._key} />}
      {/* Module Header */}
      <div>
        <div className="overflow-hidden sm:flex sm:justify-between">
          <nav
            className="-mb-px flex space-x-4 px-6 sm:pr-0 overflow-x-auto"
            aria-label="Tabs"
          >
            {tabs.map((tab, index) => (
              <a
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault() // prevent url change
                  setActiveTabIdx(index)
                }}
                className={clsx(
                  `whitespace-nowrap py-2 px-1 relative`,
                  activeTabIdx === index && tabs.length > 1
                    ? `after:bg-gray-700 after:left-[50%] after:-translate-x-1/2 after:bottom-0 after:absolute after:w-1/2 after:h-0.5 after:rounded-full after:content-[''] after:block`
                    : 'border-transparent'
                )}
              >
                <ModuleHeaderText
                  value={tab?.title}
                  bold={activeTabIdx === index}
                />
              </a>
            ))}
          </nav>
          {adTitle && (
            <div className="hidden sm:flex pr-6 items-center">
              {adUrl ? (
                <a href={adUrl} target="_blank" rel="noreferrer">
                  <span className="text-base text-red-500">{adTitle}</span>
                </a>
              ) : (
                <span className="text-base text-red-500">{adTitle}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Module Body */}
      <div className="px-2.5 py-3">
        <ul role="list" className={gridClass}>
          {tabs[activeTabIdx]?.links?.map((link, index) => (
            <li key={index} className="relative">
              <a
                href={link.url}
                rel="noreferrer"
                target="_blank"
                className={data.title}
              >
                <div
                  className={clsx(
                    'flex items-center rounded-md p-2 hover:bg-gray-100'
                  )}
                >
                  {link.logo && (
                    <div className="flex-none">
                      <Image
                        src={urlForImage(link.logo)
                          ?.height(columns === 'nine' ? 16 : 26)
                          .width(columns === 'nine' ? 16 : 26)
                          .url()}
                        alt={link.title}
                        width={logoWidth}
                        height={logoWidth}
                        style={{ marginRight: logoMargin }}
                      />
                    </div>
                  )}
                  <div className="">
                    <p
                      className={clsx(
                        'text-gray-600 text-sm line-clamp-1',
                        shouldBoldLinkTitles && 'font-bold'
                      )}
                    >
                      {link.title}
                    </p>
                    {link.description && (
                      <p className="text-xs text-gray-500 line-clamp-2">
                        {link.description}
                      </p>
                    )}
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
