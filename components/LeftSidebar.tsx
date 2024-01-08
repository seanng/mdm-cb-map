'use client'

import { useSidebar } from 'contexts/sidebar'
import clsx from 'clsx'

interface Props {
  data: Array<{
    _key: string
    title: string
  }>
}

/**
 * This component contains the "floating left sidebar". 
 * The useSidebar hook is used to determine which module of the page is currently being viewed.
 */
export function LeftSidebar({ data }: Props) {
  const { currentNavIdx } = useSidebar()

  const handleClick = (id) => (e) => {
    e.preventDefault()
    document.getElementById(id).scrollIntoView()
  }

  return (
    <div>
      <ul className="space-y-3">
        {data.map(({ _key, title }, i) => (
          <li key={_key}>
            <a
              className={clsx(
                'text-sm',
                currentNavIdx === i
                  ? 'text-blue-500 font-bold'
                  : 'text-gray-800'
              )}
              onClick={handleClick(_key)}
              href="#"
            >
              {title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
