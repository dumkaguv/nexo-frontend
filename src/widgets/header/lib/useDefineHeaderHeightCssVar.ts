import { useEffect } from 'react'

export const useDefineHeaderHeightCssVar = () => {
  useEffect(() => {
    const defineHeaderHeightCssVar = () => {
      const header = document.querySelector<HTMLElement>('header')

      if (!header) {
        return
      }

      const height = header.offsetHeight

      document.documentElement.style.setProperty(
        '--header-height',
        `${height}px`
      )
    }

    defineHeaderHeightCssVar()

    window.addEventListener('resize', defineHeaderHeightCssVar)

    return () => {
      window.removeEventListener('resize', defineHeaderHeightCssVar)
    }
  }, [])
}
