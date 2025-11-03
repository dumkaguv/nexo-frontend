import { useMutation, useQuery } from '@tanstack/react-query'
import { Heart } from 'lucide-react'

import { useState } from 'react'

import {
  postControllerCreateLikeMutation,
  postControllerFindAllLikesOptions,
  postControllerFindAllLikesQueryKey,
  postControllerRemoveLikeMutation
} from '@/api'
import { Typography } from '@/components/shared'
import { Button, Skeleton } from '@/components/ui'
import { useInvalidatePredicateQueries } from '@/hooks'
import { cn, showApiErrors } from '@/utils'

import { PostLikesModal } from './PostLikesModal'

const { Text } = Typography

type Props = {
  postId: number
  isLiked?: boolean
}

export const PostLikes = ({ postId, isLiked: isLikedProp = false }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)
  const [isLiked, setIsLiked] = useState(isLikedProp)

  const { invalidateQueries } = useInvalidatePredicateQueries()

  const path = { id: String(postId) }
  const { data, isLoading } = useQuery({
    ...postControllerFindAllLikesOptions({ path, query: { pageSize: 1 } }),
    enabled: !!postId
  })

  const getMutationConfig = () => ({
    onSuccess: async () =>
      await invalidateQueries([postControllerFindAllLikesQueryKey({ path })]),
    onError: (e: unknown) => showApiErrors(e)
  })
  const { mutateAsync: likeAsync, isPending: isPendingLike } = useMutation({
    ...postControllerCreateLikeMutation(),
    ...getMutationConfig()
  })

  const { mutateAsync: unlikeAsync, isPending: isPendingUnlike } = useMutation({
    ...postControllerRemoveLikeMutation(),
    ...getMutationConfig()
  })

  const onLike = async () => {
    if (isLiked) {
      await unlikeAsync({ path })
    } else {
      await likeAsync({ path })
    }

    setIsLiked((prev) => !prev)
  }

  const onToggleModal = () => setIsOpenModal((prev) => !prev)

  const totalLikes = data?.total ?? 0
  const isLoadingButtonState = isPendingLike || isPendingUnlike

  return (
    <>
      <div className="mt-2">
        <div className="flex items-center gap-1.5">
          {isLoading ? (
            <Skeleton className="h-6 w-10" />
          ) : (
            <>
              <Button
                variant="text"
                size="icon"
                onClick={onLike}
                loading={isLoadingButtonState}
                showLoadingIcon={false}
                className={cn(
                  'h-5 w-fit justify-start hover:scale-[1.05]',
                  isLiked && 'text-destructive'
                )}
              >
                <Heart fill={isLiked ? 'current-color' : undefined} />
              </Button>
              <Text
                onClick={totalLikes > 0 ? onToggleModal : undefined}
                className={cn('text-sm', totalLikes > 0 && 'cursor-pointer')}
              >
                {data?.total}
              </Text>
            </>
          )}
        </div>
      </div>

      <PostLikesModal
        postId={postId}
        open={isOpenModal}
        onOpenChange={onToggleModal}
      />
    </>
  )
}
