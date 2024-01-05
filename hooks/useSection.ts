import { useSidebar } from 'contexts/sidebar'
import { useEffect, useRef } from 'react'
import { useIntersectionObserver } from './useIntersectionObserver'

export function useSection(navIdx: number) {
  const { currentNavIdx, setCurrentNavIdx } = useSidebar()

  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {
    threshold: 0.2,
  })

  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    if (
      navIdx !== undefined &&
      currentNavIdx !== undefined &&
      setCurrentNavIdx
    ) {
      // scroll down
      if (!isVisible && currentNavIdx === navIdx) {
        setCurrentNavIdx(navIdx + 1)
      }

      // scroll up
      if (isVisible && currentNavIdx === navIdx + 1) {
        setCurrentNavIdx(navIdx)
      }
    }
  }, [isVisible, navIdx, currentNavIdx, setCurrentNavIdx])

  return { ref }
}
