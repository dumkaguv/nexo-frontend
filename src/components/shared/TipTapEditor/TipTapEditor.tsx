import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyleKit } from '@tiptap/extension-text-style'
import {
  EditorContent,
  useEditor,
  type EditorContentProps
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect } from 'react'

import { useTranslation } from 'react-i18next'

import { TipTapToolbar } from './TipTapToolbar'

const extensions = [StarterKit, TextStyleKit]

type TipTapEditorProps = {
  value?: string
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  toolbarClassName?: string
} & Partial<EditorContentProps>

export const TipTapEditor = ({
  value,
  onChange,
  onBlur,
  placeholder,
  toolbarClassName,
  ...props
}: TipTapEditorProps) => {
  const { t } = useTranslation()

  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: placeholder || t('inputs.defaultPlaceholder'),
        emptyNodeClass:
          'first:before:text-muted-foreground/50 first:before:float-left first:before:content-[attr(data-placeholder)] first:before:pointer-events-none first:before:text-sm '
      })
    ],
    content: value,
    onUpdate: ({ editor }) => onChange?.(editor.getHTML()),
    onBlur: () => onBlur?.()
  })

  useEffect(() => {
    if (!editor) {
      return
    }

    if (value !== editor.getHTML()) {
      editor.commands.setContent(value || '')
    }
  }, [value, editor])

  if (!editor) {
    return null
  }

  return (
    <>
      <TipTapToolbar editor={editor} className={toolbarClassName} />
      <EditorContent
        {...props}
        editor={editor}
        className="min-h-15 rounded-lg border"
      />
    </>
  )
}
