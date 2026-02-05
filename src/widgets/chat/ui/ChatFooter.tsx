import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react'
import { Paperclip, Send, Smile } from 'lucide-react'

import { useRef } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { cn, isEmptyHTMLEditor } from '@/shared/lib'
import { useThemeStore } from '@/shared/model'
import { ImagePreview, InputUpload, TipTapEditor } from '@/shared/ui'
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
} from '@/shared/ui/shadcn'

import type { SendMessageSchema } from '../contracts'

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
  } = useFormContext<SendMessageSchema>()
  const files = useWatch({ control, name: 'files', defaultValue: [] })
  const content = useWatch({ control, name: 'content', defaultValue: '' })
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

  const renderActionButtons = ({
    buttonClassName,
    iconClassName
  }: {
    buttonClassName?: string
    iconClassName?: string
  } = {}) => (
    <>
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
                className={buttonClassName}
              >
                <Smile className={cn('size-4', iconClassName)} />
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
              className={buttonClassName}
            >
              <Paperclip className={cn('size-4', iconClassName)} />
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
            disabled={
              isEmptyHTMLEditor(content) && !files?.length && !isPendingUpload
            }
            loading={isPendingUpload}
            showChildrenWhenLoading={false}
            aria-label={`${t('send')} ${t('message').toLowerCase()}`}
            className={buttonClassName}
          >
            <Send className={cn('size-4', iconClassName)} />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </>
  )

  return (
    <footer className="flex items-end gap-3 px-4 py-3 max-lg:gap-2 max-lg:px-2 max-lg:pt-3 max-lg:pb-2">
      <div className="flex w-full flex-col gap-4">
        <ImagePreview
          files={files ?? []}
          onDeleteImage={onDeleteImage}
          maxImages={3}
          showDeleteIcon
          className="size-30 max-lg:size-25"
          containerClassName="flex gap-4 flex-wrap"
        />

        <Field>
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <TipTapEditor
                  editorRef={editorRef}
                  showToolbar={false}
                  placeholder={t('typeMessage')}
                  className="min-h-12 w-full pr-28 sm:pr-0"
                  {...field}
                />
                <div className="absolute right-2 bottom-2 z-10 flex items-center gap-1 sm:hidden">
                  {renderActionButtons({
                    buttonClassName: 'size-8',
                    iconClassName: 'size-3.5'
                  })}
                </div>
              </div>
            )}
          />
          <FieldError>{errors.content?.message}</FieldError>
        </Field>
      </div>

      <div className="hidden flex-nowrap items-center gap-2 max-lg:gap-1.5 sm:flex">
        {renderActionButtons()}
      </div>
    </footer>
  )
}
