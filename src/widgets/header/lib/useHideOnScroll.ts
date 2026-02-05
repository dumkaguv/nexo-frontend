import { useEffect, useRef, useState } from 'react'

import { BreakpointsMax } from '@/shared/config'
import { useMaxWidth } from '@/shared/hooks'

export const useHideOnScroll = (threshold = 5, topOffset = 5) => {
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)

  const isMobile = useMaxWidth(BreakpointsMax.lg)

  useEffect(() => {
    if (!isMobile) {
      setHidden(false)

      return
    }

    const onScroll = () => {
      const y = window.scrollY

      if (y <= topOffset) {
        setHidden(false)
        lastScrollY.current = y

        return
      }

      if (Math.abs(y - lastScrollY.current) < threshold) {
        return
      }

      setHidden(y > lastScrollY.current)
      lastScrollY.current = y
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
    }
  }, [isMobile, threshold, topOffset])

  return hidden
}
