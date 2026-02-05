import { useEffect, useState } from 'react'

export const useMatchMedia = (query: string) => {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    const listener = () => setMatches(media.matches)

    listener()

    media.addEventListener('change', listener)

    return () => {
      media.removeEventListener('change', listener)
    }
  }, [query])

  return matches
}

export const useMinWidth = (px: number) => {
  return useMatchMedia(`(min-width: ${px}px)`)
}

export const useMaxWidth = (px: number) => {
  return useMatchMedia(`(max-width: ${px}px)`)
}
