import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react'
import { Paperclip, Send, Smile } from 'lucide-react'

import { useRef } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { ImagePreview, InputUpload, TipTapEditor } from '@/components/shared'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  Field,
  FieldError,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import { useThemeStore } from '@/stores'

import type { CreateSendMessageSchema } from '@/features/conversations/zodSchemas'
import type { Editor } from '@tiptap/react'

type Props = {
  isPendingUpload: boolean
}

export const ChatFooter = ({ isPendingUpload }: Props) => {
  const editorRef = useRef<Editor | null>(null)

  const {
    control,
    setValue,
    formState: { errors }
  } = useFormContext<CreateSendMessageSchema>()
  const files = useWatch({ control, name: 'files', defaultValue: [] })
  const { theme } = useThemeStore()
  const { t } = useTranslation()

  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    const editor = editorRef.current

    if (!editor) {
      return
    }

    editor.chain().focus().insertContent(emoji).run()
  }

  const onChange = (files: File[]) => {
    setValue('files', files, { shouldDirty: true, shouldValidate: true })
  }

  const onDeleteImage = (index: number) => {
    const nextFiles = files?.filter((_, i) => i !== index) ?? []

    setValue('files', nextFiles, { shouldDirty: true, shouldValidate: true })
  }

  return (
    <footer className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-end">
      <div className="flex w-full flex-col gap-4">
        <ImagePreview
          files={files ?? []}
          onDeleteImage={onDeleteImage}
          className="size-full"
          maxImages={4}
          showDeleteIcon
          containerClassName="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        />

        <Field>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <TipTapEditor
                editorRef={editorRef}
                showToolbar={false}
                placeholder={t('typeMessage')}
                className="min-h-12 w-full"
                {...field}
              />
            )}
          />
          <FieldError>{errors.content?.message}</FieldError>
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:flex-nowrap">
        <DropdownMenu>
          <Tooltip>
            <TooltipContent>
              {t('select')} {t('emoji').toLowerCase()}
            </TooltipContent>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  aria-label={`${t('select')} ${t('emoji').toLowerCase()}`}
                >
                  <Smile className="size-4" />
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
          </Tooltip>

          <DropdownMenuContent
            align="end"
            onCloseAutoFocus={(e) => e.preventDefault()}
          >
            <EmojiPicker
              theme={theme === 'light' ? Theme.LIGHT : Theme.DARK}
              onEmojiClick={onEmojiClick}
            />
          </DropdownMenuContent>
        </DropdownMenu>

        <Tooltip>
          <TooltipContent>
            {t('attach')} {t('photo').toLowerCase()}
          </TooltipContent>
          <InputUpload accept="image/*" onChange={onChange} multiple>
            <TooltipTrigger asChild>
              <Button
                variant="secondary"
                size="icon"
                aria-label={`${t('attach')} ${t('photo').toLowerCase()}`}
              >
                <Paperclip />
              </Button>
            </TooltipTrigger>
          </InputUpload>
        </Tooltip>

        <Tooltip>
          <TooltipContent>
            {t('send')} {t('message').toLowerCase()}
          </TooltipContent>
          <TooltipTrigger asChild>
            <Button
              type="submit"
              size="icon"
              loading={isPendingUpload}
              showChildrenWhenLoading={false}
              aria-label={`${t('send')} ${t('message').toLowerCase()}`}
            >
              <Send className="size-4" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </footer>
  )
}
