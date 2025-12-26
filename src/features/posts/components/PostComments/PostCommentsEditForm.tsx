import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'

import { Check, X } from 'lucide-react'

import { Controller, useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  postControllerFindAllCommentsInfiniteQueryKey,
  postControllerFindAllInfiniteQueryKey,
  postControllerUpdateCommentMutation
} from '@/api'
import { TipTapEditor } from '@/components/shared'
import { Button, Field, FieldError } from '@/components/ui'

import { createCommentSchema } from '@/features/posts/zodSchemas'
import { useInvalidatePredicateQueries } from '@/hooks'
import { showApiErrors } from '@/utils'

import type { ResponsePostCommentDto } from '@/api'
import type { CreateCommentSchema } from '@/features/posts/zodSchemas'
import type { Dispatch, SetStateAction } from 'react'

type Props = {
  comment: ResponsePostCommentDto
  postId: number
  setIsEditing: Dispatch<SetStateAction<boolean>>
}

export const PostCommentsEditForm = ({
  comment,
  postId,
  setIsEditing
}: Props) => {
  const { t } = useTranslation()

  const schema = createCommentSchema(t)
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCommentSchema>({
    resolver: zodResolver(schema),
    defaultValues: { content: comment.content }
  })
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutateAsync: updateCommentAsync, isPending } = useMutation({
    ...postControllerUpdateCommentMutation(),
    onSuccess: async () => {
      invalidateQueries([postControllerFindAllInfiniteQueryKey()])
      await invalidateQueries([
        postControllerFindAllCommentsInfiniteQueryKey({
          path: { id: String(postId) }
        })
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const onCancelEdit = () => setIsEditing(false)
  const path = { id: String(postId), commentId: String(comment.id) }
  const onSubmit = handleSubmit(async (body: CreateCommentSchema) => {
    await updateCommentAsync({ path, body })
    onCancelEdit()
  })

  return (
    <form>
      <div className="flex flex-col gap-5">
        <Field>
          <Controller
            control={control}
            name="content"
            render={({ field }) => <TipTapEditor {...field} />}
          />

          <FieldError>{errors.content?.message}</FieldError>
        </Field>

        <div className="flex items-center gap-2 self-end">
          <Button
            variant="destructive"
            onClick={onCancelEdit}
            disabled={isPending}
          >
            <X />
            {t('cancel')}
          </Button>
          <Button onClick={onSubmit} loading={isPending}>
            <Check />
            {t('confirm')}
          </Button>
        </div>
      </div>
    </form>
  )
}
