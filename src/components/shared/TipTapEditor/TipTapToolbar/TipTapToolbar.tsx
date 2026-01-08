import { useEditorState, type Editor } from '@tiptap/react'

import {
  Bold,
  Code,
  CodeSquare,
  CornerDownLeft,
  Eraser,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Minus,
  Pilcrow,
  Quote,
  Redo,
  Strikethrough,
  Undo
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'

import { cn } from '@/utils'

import type { ComponentProps } from 'react'

type Props = {
  editor: Editor
} & ComponentProps<'div'>

export const TipTapToolbar = ({ editor, className, ...props }: Props) => {
  const { t } = useTranslation()

  const state = useEditorState({
    editor,
    selector: (ctx) => ({
      isBold: ctx.editor.isActive('bold'),
      canBold: ctx.editor.can().chain().toggleBold().run(),

      isItalic: ctx.editor.isActive('italic'),
      canItalic: ctx.editor.can().chain().toggleItalic().run(),

      isStrike: ctx.editor.isActive('strike'),
      canStrike: ctx.editor.can().chain().toggleStrike().run(),

      isCode: ctx.editor.isActive('code'),
      canCode: ctx.editor.can().chain().toggleCode().run(),

      canClearMarks: ctx.editor.can().chain().unsetAllMarks().run(),

      isParagraph: ctx.editor.isActive('paragraph'),

      isHeading1: ctx.editor.isActive('heading', { level: 1 }),
      isHeading2: ctx.editor.isActive('heading', { level: 2 }),
      isHeading3: ctx.editor.isActive('heading', { level: 3 }),
      isHeading4: ctx.editor.isActive('heading', { level: 4 }),
      isHeading5: ctx.editor.isActive('heading', { level: 5 }),
      isHeading6: ctx.editor.isActive('heading', { level: 6 }),

      isBulletList: ctx.editor.isActive('bulletList'),
      isOrderedList: ctx.editor.isActive('orderedList'),
      isCodeBlock: ctx.editor.isActive('codeBlock'),
      isBlockquote: ctx.editor.isActive('blockquote'),

      canUndo: ctx.editor.can().chain().undo().run(),
      canRedo: ctx.editor.can().chain().redo().run()
    })
  })

  const iconProps = { className: 'size-3' }

  return (
    <div
      className={cn('flex flex-wrap items-center gap-1', className)}
      {...props}
    >
      {[
        { key: 'bold', icon: Bold, active: state.isBold, can: state.canBold },
        {
          key: 'italic',
          icon: Italic,
          active: state.isItalic,
          can: state.canItalic
        },
        {
          key: 'strike',
          icon: Strikethrough,
          active: state.isStrike,
          can: state.canStrike
        },
        {
          key: 'inlineCode',
          icon: Code,
          active: state.isCode,
          can: state.canCode
        },
        {
          key: 'clearMarks',
          icon: Eraser,
          active: false,
          can: state.canClearMarks
        }
      ].map((btn) => (
        <Tooltip key={btn.key}>
          <TooltipContent>{t(btn.key)}</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              className="size-6"
              variant={btn.active ? 'default' : 'outline'}
              disabled={btn.can === false}
              onClick={() => {
                switch (btn.key) {
                  case 'bold':
                    editor.chain().focus().toggleBold().run()
                    break

                  case 'italic':
                    editor.chain().focus().toggleItalic().run()
                    break

                  case 'strike':
                    editor.chain().focus().toggleStrike().run()
                    break

                  case 'inlineCode':
                    editor.chain().focus().toggleCode().run()
                    break

                  case 'clearMarks':
                    editor.chain().focus().unsetAllMarks().run()
                    break
                }
              }}
            >
              <btn.icon {...iconProps} />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipContent>{t('paragraph')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant={state.isParagraph ? 'default' : 'outline'}
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <Pilcrow {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      {[
        { key: 'heading1', icon: Heading1, active: state.isHeading1, level: 1 },
        { key: 'heading2', icon: Heading2, active: state.isHeading2, level: 2 },
        { key: 'heading3', icon: Heading3, active: state.isHeading3, level: 3 },
        { key: 'heading4', icon: Heading4, active: state.isHeading4, level: 4 },
        { key: 'heading5', icon: Heading5, active: state.isHeading5, level: 5 },
        { key: 'heading6', icon: Heading6, active: state.isHeading6, level: 6 }
      ].map((btn) => (
        <Tooltip key={btn.key}>
          <TooltipContent>{t(btn.key)}</TooltipContent>
          <TooltipTrigger asChild>
            <Button
              className="size-6"
              variant={btn.active ? 'default' : 'outline'}
              onClick={() =>
                editor
                  .chain()
                  .focus()
                  .toggleHeading({
                    level: btn.level as 1 | 2 | 3 | 4 | 5 | 6
                  })
                  .run()
              }
            >
              <btn.icon {...iconProps} />
            </Button>
          </TooltipTrigger>
        </Tooltip>
      ))}

      <Tooltip>
        <TooltipContent>{t('bulletList')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant={state.isBulletList ? 'default' : 'outline'}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('orderedList')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant={state.isOrderedList ? 'default' : 'outline'}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('codeBlock')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant={state.isCodeBlock ? 'default' : 'outline'}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <CodeSquare {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('blockquote')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant={state.isBlockquote ? 'default' : 'outline'}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('horizontalRule')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant="outline"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('hardBreak')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant="outline"
            onClick={() => editor.chain().focus().setHardBreak().run()}
          >
            <CornerDownLeft {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('undo')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant="outline"
            disabled={!state.canUndo}
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>

      <Tooltip>
        <TooltipContent>{t('redo')}</TooltipContent>
        <TooltipTrigger asChild>
          <Button
            className="size-6"
            variant="outline"
            disabled={!state.canRedo}
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo {...iconProps} />
          </Button>
        </TooltipTrigger>
      </Tooltip>
    </div>
  )
}
