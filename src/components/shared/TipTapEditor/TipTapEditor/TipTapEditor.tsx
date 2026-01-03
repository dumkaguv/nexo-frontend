import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyleKit } from '@tiptap/extension-text-style'
import {
  EditorContent,
  useEditor,
  type Editor,
  type EditorContentProps
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { useEffect, type MutableRefObject } from 'react'

import { useTranslation } from 'react-i18next'

import { TipTapToolbar } from '@/components/shared/TipTapEditor/TipTapToolbar'
import { cn } from '@/utils'

const extensions = [StarterKit, TextStyleKit]

type TipTapEditorProps = {
  value?: string
  showToolbar?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  toolbarClassName?: string
  editorRef?: MutableRefObject<Editor | null>
} & Partial<EditorContentProps>

export const TipTapEditor = ({
  value,
  showToolbar = true,
  onChange,
  onBlur,
  placeholder,
  toolbarClassName,
  editorRef,
  className,
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

  useEffect(() => {
    if (editorRef) {
      editorRef.current = editor
    }
  }, [editorRef, editor])

  if (!editor) {
    return null
  }

  return (
    <>
      {showToolbar && (
        <TipTapToolbar editor={editor} className={toolbarClassName} />
      )}

      <EditorContent
        {...props}
        editor={editor}
        className={cn('min-h-15 rounded-lg border', className)}
      />
    </>
  )
}
