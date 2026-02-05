import { useEffect, useRef } from 'react'
import { useLocation, useNavigation } from 'react-router-dom'

import LoadingBar, { type LoadingBarRef } from 'react-top-loading-bar'

import { usePageTitle } from '@/shared/hooks'

export const RouteLoader = () => {
  const ref = useRef<LoadingBarRef>(null)
  const navigation = useNavigation()
  const location = useLocation()
  const fallbackTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  usePageTitle()

  useEffect(() => {
    if (navigation.state === 'loading') {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [navigation.state])

  useEffect(() => {
    if (navigation.state !== 'idle') {
      return
    }

    ref.current?.continuousStart()

    if (fallbackTimerRef.current) {
      clearTimeout(fallbackTimerRef.current)
    }

    fallbackTimerRef.current = setTimeout(() => {
      ref.current?.complete()
    }, 200)

    return () => {
      if (fallbackTimerRef.current) {
        clearTimeout(fallbackTimerRef.current)
      }
    }
  }, [location.key, navigation.state])

  return <LoadingBar color="#29d" ref={ref} />
}
