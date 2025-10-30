import { default as queryString } from 'query-string'
import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

import type { AnyObject } from '@/types'

import type { ParseOptions } from 'query-string'

export const useQueryParams = (
  options: ParseOptions = { arrayFormat: 'comma' }
): AnyObject => {
  const { search } = useLocation()

  const params = useMemo(() => {
    return queryString.parse(search, options)
  }, [search, options])

  return params
}
