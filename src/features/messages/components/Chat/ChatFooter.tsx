import EmojiPicker, { Theme, type EmojiClickData } from 'emoji-picker-react'
import { Paperclip, Send, Smile } from 'lucide-react'
import { useRef } from 'react'
import { Controller, type Control, type FieldErrors } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { TipTapEditor } from '@/components/shared'
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

import type { CreateSendMessageSchema } from '@/features/messages/zodSchemas'
import type { Editor } from '@tiptap/react'

type Props = {
  control: Control<CreateSendMessageSchema>
  errors: FieldErrors<CreateSendMessageSchema>
}

export const ChatFooter = ({ control, errors }: Props) => {
  const editorRef = useRef<Editor | null>(null)

  const { theme } = useThemeStore()
  const { t } = useTranslation()

  const onEmojiClick = ({ emoji }: EmojiClickData) => {
    const editor = editorRef.current

    if (!editor) {
      return
    }
    editor.chain().focus().insertContent(emoji).run()
  }

  return (
    <footer className="flex items-end gap-3 px-6 py-4">
      <Field>
        <Controller
          name="content"
          control={control}
          render={({ field }) => (
            <TipTapEditor
              editorRef={editorRef}
              placeholder={t('typeMessage')}
              showToolbar={false}
              className="min-h-12 w-full"
              {...field}
            />
          )}
        />
        <FieldError>{errors.content?.message}</FieldError>
      </Field>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <Tooltip>
            <TooltipContent>
              {t('select')} {t('emoji').toLowerCase()}
            </TooltipContent>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button variant="secondary" size="icon">
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
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon">
              <Paperclip />
            </Button>
          </TooltipTrigger>
        </Tooltip>

        <Tooltip>
          <TooltipContent>
            {t('send')} {t('message').toLowerCase()}
          </TooltipContent>
          <TooltipTrigger asChild>
            <Button type="submit" size="icon">
              <Send className="size-4" />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </footer>
  )
}
