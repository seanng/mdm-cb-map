'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { useRef, useState } from 'react'

interface SearchbarTab {
  title: string
  baseUrl: string
  placeholder?: string
}

const tabs = [
  {
    title: 'Google',
    baseUrl: 'https://www.google.com/search?q=',
  },
  {
    title: 'Bing',
    baseUrl: 'https://www.bing.com/search?q=',
  },
  {
    title: 'Yahoo 奇摩',
    baseUrl: 'https://tw.search.yahoo.com/search?p=',
  },
  {
    title: 'Baidu',
    baseUrl: 'https://www.baidu.com/s?wd=',
  },
  {
    title: 'Amazon US',
    baseUrl: 'https://www.amazon.com/s?k=',
  },
] as SearchbarTab[]

export function Searchbar() {
  const [activeTabIdx, setActiveTabIdx] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = inputRef.current?.value
    const { baseUrl } = tabs[activeTabIdx]
    window.open(baseUrl + encodeURI(input), '_blank')
  }

  return (
    <div>
      {/* Search Tabs */}
      <div
        className="-mb-px flex space-x-3 md:space-x-6 px-2 pb-3 text-sm"
        aria-label="Search Tabs"
      >
        {tabs.map(({ title }, index) => (
          <a
            key={title}
            href="#"
            onClick={(e) => {
              e.preventDefault() // prevent url change
              setActiveTabIdx(index)
            }}
            className={`whitespace-nowrap py-2 px-1 relative ${
              activeTabIdx === index
                ? clsx(
                    `text-blue-500 font-bold`,
                    `after:bg-blue-500 after:left-[50%] after:-translate-x-1/2 after:bottom-0 after:absolute after:w-1/4 after:h-1 after:rounded-full after:content-[''] after:block`
                  )
                : 'border-transparent text-gray-600'
            }`}
          >
            {title}
          </a>
        ))}
      </div>
      {/* Search Bar */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative">
          <input
            id="search"
            ref={inputRef}
            name="search"
            className="block w-full rounded-lg border border-gray-300 py-3 pl-4 pr-3 leading-5 focus:border-transparent focus:text-gray-900 focus:placeholder-gray-500 focus:outline-none focus:ring-white text-base md:text-lg"
            placeholder={tabs[activeTabIdx].placeholder ?? '請輸入搜索內容'}
            type="search"
          />
          <div className="absolute top-0 right-0 h-full w-[73px]">
            <button className="bg-blue-500 h-full w-full border border-blue-500 border-l-0 rounded-r-lg flex items-center justify-center">
              <MagnifyingGlassIcon
                className="h-6 w-6 flex-shrink-0 text-white"
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
