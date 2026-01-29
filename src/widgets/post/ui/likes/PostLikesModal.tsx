import { useInfiniteQuery } from '@tanstack/react-query'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { postLikesControllerFindAllLikesInfiniteOptions } from '@/shared/api'
import { useDebouncedValue } from '@/shared/hooks'
import { InputSearch } from '@/shared/ui'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from '@/shared/ui/shadcn'

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
    ...postLikesControllerFindAllLikesInfiniteOptions({
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
