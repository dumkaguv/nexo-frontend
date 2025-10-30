import { default as queryString } from 'query-string'
import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { useQueryParams } from './useQueryParams'

import type { ParsedQuery } from 'query-string'

export const useQueryUpdate = () => {
  const push = useNavigate()
  const location = useLocation()
  const params = useQueryParams()

  const updateQuery = useCallback(
    (filters: ParsedQuery, reset = false) => {
      const { pathname, search, hash } = location
      const parsedSearchQuery = queryString.parse(search)

      const query = reset ? filters : { ...parsedSearchQuery, ...filters }

      const pushURL = queryString.stringifyUrl(
        {
          url: pathname + hash,
          query
        },
        {
          skipEmptyString: true,
          skipNull: true,
          arrayFormat: 'comma'
        }
      )

      if (pathname + search + hash !== pushURL.replace(/\?+$/g, '')) {
        push(pushURL)
      }
    },
    [push, location]
  )

  return { params, updateQuery }
}
