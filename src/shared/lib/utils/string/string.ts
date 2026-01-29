import { emptyHtmlRegex } from '@/shared/config'

export const getInitials = (name?: string) => {
  const parts = name?.trim().split(' ').filter(Boolean)

  if (parts?.length === 0 || !parts) {
    return '?'
  }

  if (parts?.length === 1) {
    return parts[0].slice(0, 2).toUpperCase()
  }

  return (parts[0][0] + parts[1][0]).toUpperCase()
}

export const isEmptyHTMLEditor = (html: string) => emptyHtmlRegex.test(html)
