import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { Send } from 'lucide-react'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  postControllerCreateCommentMutation,
  postControllerFindAllCommentsInfiniteQueryKey,
  postControllerFindAllInfiniteQueryKey
} from '@/api'
import {
  AvatarWithColorInitials,
  TextAreaAutoHeight
} from '@/components/shared'
import {
  Button,
  Field,
  FieldError,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import {
  type CreateCommentSchema,
  createCommentSchema
} from '@/features/posts/zodSchemas'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

import { PostCommentsList } from './PostCommentsList'

import type { KeyboardEvent } from 'react'

type Props = {
  postId: number
}

export const PostCommentsSection = ({ postId }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const schema = createCommentSchema(t)
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      content: ''
    }
  })

  const path = { id: String(postId) }

  const { mutateAsync: addCommentAsync, isPending } = useMutation({
    ...postControllerCreateCommentMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        postControllerFindAllCommentsInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])
      invalidateQueries([postControllerFindAllInfiniteQueryKey()])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const onAddComment = async (body: CreateCommentSchema) =>
    await addCommentAsync({ path, body })

  const onSubmit = handleSubmit(async (body) => {
    await onAddComment(body)
    reset()
  })

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  return (
    <>
      <div className="flex gap-2">
        <AvatarWithColorInitials user={user} />

        <form onSubmit={onSubmit} className="w-full">
          <Field>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <div className="relative">
                  <TextAreaAutoHeight
                    placeholder={t('addComment')}
                    onKeyDown={onKeyDown}
                    className="h-12 resize-none overflow-y-hidden pr-15"
                    {...field}
                  />

                  <Tooltip>
                    <TooltipContent>{t('send')}</TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        type="submit"
                        onKeyDown={(e) => e.key === 'enter' && onAddComment}
                        loading={isPending}
                        showChildrenWhenLoading={false}
                        className="absolute right-1.5 bottom-1.5 bg-transparent"
                      >
                        <Send />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                </div>
              )}
            />
            <FieldError>{errors.content?.message}</FieldError>
          </Field>
        </form>
      </div>

      <PostCommentsList postId={postId} />
    </>
  )
}
