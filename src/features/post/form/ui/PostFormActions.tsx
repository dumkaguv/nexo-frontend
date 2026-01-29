import { Eye, X, Check, Bookmark, Image } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { InputUpload, Typography } from '@/shared/ui'

import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

type Props = {
  isPending: boolean
  isEditing?: boolean
  onChange: (files: File[]) => void
  onTogglePreview: () => void
  onCancelEdit?: () => void
}

export const PostFormActions = ({
  isPending,
  isEditing,
  onTogglePreview,
  onCancelEdit,
  onChange
}: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-3 pt-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <Tooltip>
          <InputUpload accept="image/*" onChange={onChange} multiple>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                disabled={isPending}
                className="bg-muted-foreground/7 gap-1 rounded-lg"
              >
                <Image className="text-green-500" />
                <Typography.Text className="text-sm opacity-70">
                  {t('photo')}
                </Typography.Text>
              </Button>
            </TooltipTrigger>
          </InputUpload>
          <TooltipContent>
            {t('attach')} {t('photo').toLowerCase()}
          </TooltipContent>
        </Tooltip>
        <Button
          variant="ghost"
          disabled={isPending}
          onClick={onTogglePreview}
          className="bg-muted-foreground/7 gap-1 rounded-lg"
        >
          <Eye className="text-blue-400" />
          <Typography.Text className="text-sm opacity-70">
            {t('preview')}
          </Typography.Text>
        </Button>
      </div>

      <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
        {isEditing && (
          <Button
            variant="destructive"
            size="sm"
            disabled={isPending}
            onClick={onCancelEdit}
            className="bg-destructive/90 justify-start"
          >
            <X /> {t('cancel')}
          </Button>
        )}
        <Button type="submit" loading={isPending}>
          {isEditing ? <Check /> : <Bookmark />}
          {t(isEditing ? 'saveChanges' : 'publish')}{' '}
          {!isEditing && t('post').toLowerCase()}
        </Button>
      </div>
    </div>
  )
}
