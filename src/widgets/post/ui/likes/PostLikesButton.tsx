import { Heart } from 'lucide-react'

import { useState } from 'react'

import { useTranslation } from 'react-i18next'

import { useToggleLike } from '@/features/post'
import { cn } from '@/shared/lib'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

import { PostLikesModal } from './PostLikesModal'

type Props = {
  postId: number
  likesCount: number
  isLiked?: boolean
}

export const PostLikesButton = ({ postId, likesCount, isLiked }: Props) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const { t } = useTranslation()

  const { toggleLike, isPending } = useToggleLike({
    postId,
    isLiked
  })

  const onToggleModal = () => setIsOpenModal((prev) => !prev)

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
              onClick={toggleLike}
              loading={isPending}
              showLoadingIcon={false}
              aria-label={t(isLiked ? 'unlikePost' : 'likePost')}
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
            <button
              onClick={likesCount > 0 ? onToggleModal : undefined}
              tabIndex={likesCount > 0 ? 0 : -1}
              className={cn('text-sm', likesCount > 0 && 'cursor-pointer')}
            >
              {likesCount}
            </button>
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
