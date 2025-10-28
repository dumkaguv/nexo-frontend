import { useEffect, useRef } from 'react'
import { useNavigation } from 'react-router-dom'

import LoadingBar from 'react-top-loading-bar'

import type { LoadingBarRef } from 'react-top-loading-bar'

export const RouteLoader = () => {
  const ref = useRef<LoadingBarRef>(null)
  const navigation = useNavigation()

  useEffect(() => {
    if (navigation.state === 'loading') {
      ref.current?.continuousStart()
    } else {
      ref.current?.complete()
    }
  }, [navigation.state])

  return <LoadingBar color="#29d" ref={ref} />
}
