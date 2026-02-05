import { Placeholder } from '@tiptap/extension-placeholder'
import { TextStyleKit } from '@tiptap/extension-text-style'
import {
  EditorContent,
  useEditor,
  type Editor,
  type EditorContentProps
} from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useEffect, type RefObject, type ReactNode } from 'react'

import { useTranslation } from 'react-i18next'

import { cn } from '@/shared/lib'
import { TipTapToolbar } from '@/shared/ui/tip-tap-editor/tip-tap-toolbar'

const extensions = [StarterKit, TextStyleKit]

type TipTapEditorProps = {
  value?: string
  showToolbar?: boolean
  onChange?: (value: string) => void
  onBlur?: () => void
  placeholder?: string
  editorBeforeChildren?: ReactNode
  editorAfterChildren?: ReactNode
  toolbarClassName?: string
  toolbarBeforeChildren?: ReactNode
  toolbarAfterChildren?: ReactNode
  editorRef?: RefObject<Editor | null>
} & Partial<EditorContentProps>

export const TipTapEditor = ({
  value,
  showToolbar = true,
  onChange,
  onBlur,
  placeholder,
  editorBeforeChildren,
  editorAfterChildren,
  toolbarBeforeChildren,
  toolbarAfterChildren,
  toolbarClassName,
  editorRef,
  className,
  ...props
}: TipTapEditorProps) => {
  const { t } = useTranslation()
  const { 'aria-label': ariaLabelProp, ...restProps } = props
  const ariaLabel = ariaLabelProp ?? placeholder ?? t('defaultPlaceholder')

  const editor = useEditor({
    extensions: [
      ...extensions,
      Placeholder.configure({
        placeholder: placeholder?.trim() || t('defaultPlaceholder'),
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
        <div className="flex w-full gap-2">
          {toolbarBeforeChildren}
          <TipTapToolbar editor={editor} className={toolbarClassName} />
          {toolbarAfterChildren}
        </div>
      )}

      <div className="flex w-full gap-2">
        {editorBeforeChildren}
        <EditorContent
          {...restProps}
          editor={editor}
          aria-label={ariaLabel}
          className={cn(
            'min-h-12 w-full overflow-hidden rounded-lg border sm:min-h-15',
            className
          )}
        />
        {editorAfterChildren}
      </div>
    </>
  )
}
