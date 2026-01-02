import { default as queryString, type ParseOptions } from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import type { AnyObject } from '@/types'

export const useQueryParams = (
  options: ParseOptions = { arrayFormat: 'comma' }
): AnyObject => {
  const { search } = useLocation()

  const params = useMemo(
    () => queryString.parse(search, options),
    [search, options]
  )

  return params
}
