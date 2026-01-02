import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { postControllerFindAllLikesInfiniteOptions } from '@/api'
import { InputSearch } from '@/components/shared'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from '@/components/ui'

import { useDebouncedValue } from '@/hooks'

import { PostLikesList } from './PostLikesList'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  postId: number
} & DialogProps

export const PostLikesModal = ({
  postId,
  open,
  onOpenChange,
  ...props
}: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
  const debouncedValue = useDebouncedValue(searchValue)

  const { t } = useTranslation()

  const { data } = useInfiniteQuery({
    ...postControllerFindAllLikesInfiniteOptions({
      path: { id: String(postId) },
      query: { search: debouncedValue }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!postId && !!open
  })

  const totalLikes = data?.pages?.[0]?.total ?? 0

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {t('liked')} ({totalLikes})
          </DialogTitle>
        </DialogHeader>

        <InputSearch
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value ?? '')}
          className="my-4"
        />

        <PostLikesList postId={postId} search={debouncedValue} />
      </DialogContent>
    </Dialog>
  )
}
