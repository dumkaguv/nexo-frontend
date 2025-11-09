import { useMutation } from '@tanstack/react-query'
import { Heart } from 'lucide-react'

import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  postControllerCreateLikeMutation,
  postControllerFindAllInfiniteQueryKey,
  postControllerFindAllLikesQueryKey,
  postControllerRemoveLikeMutation
} from '@/api'
import { Typography } from '@/components/shared'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import { useInvalidatePredicateQueries } from '@/hooks'
import { cn, showApiErrors } from '@/utils'

import { PostLikesModal } from './PostLikesModal'

type Props = {
  postId: number
  likesCount: number
  isLiked?: boolean
}

export const PostLikes = ({ postId, likesCount, isLiked }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const path = { id: String(postId) }

  const getMutationConfig = () => ({
    onSuccess: async () => {
      invalidateQueries([postControllerFindAllLikesQueryKey({ path })])
      await invalidateQueries([postControllerFindAllInfiniteQueryKey()])
      toast.success(t('success'))
    },
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
  }

  const onToggleModal = () => setIsOpenModal((prev) => !prev)

  const isLoadingButtonState = isPendingLike || isPendingUnlike

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Tooltip>
          <TooltipContent>
            {t(isLiked ? 'unlikePost' : 'likePost')}
          </TooltipContent>
          <TooltipTrigger asChild>
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
              <Heart
                fill={isLiked ? 'red' : 'transparent'}
                stroke={isLiked ? 'red' : 'currentColor'}
              />
            </Button>
          </TooltipTrigger>
        </Tooltip>

        <Tooltip>
          {likesCount > 0 && (
            <TooltipContent>{t('seeFullList')}</TooltipContent>
          )}
          <TooltipTrigger asChild>
            <Typography.Text
              onClick={likesCount > 0 ? onToggleModal : undefined}
              className={cn('text-sm', likesCount > 0 && 'cursor-pointer')}
            >
              {likesCount}
            </Typography.Text>
          </TooltipTrigger>
        </Tooltip>
      </div>

      <PostLikesModal
        postId={postId}
        open={isOpenModal}
        onOpenChange={onToggleModal}
      />
    </>
  )
}
