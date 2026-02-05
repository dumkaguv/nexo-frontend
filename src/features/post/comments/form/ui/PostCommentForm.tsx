import { Check, Send, X } from 'lucide-react'
import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { isEmptyHTMLEditor } from '@/shared/lib'
import { TipTapEditor } from '@/shared/ui'
import {
  Button,
  Field,
  FieldError,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

import type { CommentSchema } from '../contracts'
import type { BaseSyntheticEvent } from 'react'

type Props = {
  control: Control<CommentSchema>
  errors: FieldErrors<CommentSchema>
  onSubmit: (e?: BaseSyntheticEvent) => void
  isPending: boolean
  isEditing?: boolean
  onCancelEdit?: () => void
  placeholder?: string
  toolbarClassName?: string
  editorClassName?: string
  formClassName?: string
}

export const PostCommentForm = ({
  control,
  errors,
  onSubmit,
  isPending,
  isEditing,
  onCancelEdit,
  placeholder,
  toolbarClassName,
  editorClassName,
  formClassName
}: Props) => {
  const { t } = useTranslation()

  const content = useWatch({ control, name: 'content', defaultValue: '' })

  return (
    <form onSubmit={onSubmit} className={formClassName}>
      <div className="flex flex-col gap-5">
        <Field>
          <Controller
            control={control}
            name="content"
            render={({ field }) => (
              <div className="relative">
                <TipTapEditor
                  placeholder={placeholder}
                  toolbarClassName={toolbarClassName}
                  className={editorClassName}
                  {...field}
                />

                {!isEditing && (
                  <Tooltip>
                    <TooltipContent>{t('send')}</TooltipContent>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        type="submit"
                        disabled={isEmptyHTMLEditor(content)}
                        loading={isPending}
                        showChildrenWhenLoading={false}
                        className="absolute right-1.5 bottom-1.5 bg-transparent"
                      >
                        <Send />
                      </Button>
                    </TooltipTrigger>
                  </Tooltip>
                )}
              </div>
            )}
          />

          <FieldError>{errors.content?.message}</FieldError>
        </Field>

        {isEditing && (
          <div className="flex items-center gap-2 self-end">
            <Button
              variant="destructive"
              type="button"
              onClick={onCancelEdit}
              disabled={isPending}
            >
              <X />
              {t('cancel')}
            </Button>
            <Button type="submit" loading={isPending}>
              <Check />
              {t('confirm')}
            </Button>
          </div>
        )}
      </div>
    </form>
  )
}
