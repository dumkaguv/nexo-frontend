import { Undo2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/entities/session'
import { UserAvatar, UserFullName } from '@/entities/user'
import { Breakpoints } from '@/shared/config'
import { useMaxWidth } from '@/shared/hooks'
import { cn } from '@/shared/lib'

import { Card, DayLabel, ImagePreview, TipTapEditorPreview } from '@/shared/ui'
import { Button } from '@/shared/ui/shadcn'

type Props = {
  content: string
  previews: string[]
  onBack: () => void
}

export const PostPreview = ({ content, previews, onBack }: Props) => {
  const { user, isUserLoading } = useAuthStore()
  const { t } = useTranslation()
  const isMobile = useMaxWidth(Breakpoints.md)

  const totalFiles = previews.length

  return (
    <Card className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <div className="flex items-center gap-3">
          <UserAvatar user={user} isLoading={isUserLoading} />
          <div className="flex items-center gap-2 max-md:flex-col max-md:gap-0">
            <UserFullName
              name={user?.profile.fullName}
              className="text-base max-lg:text-lg"
            />

            <DayLabel date={new Date()} showIcon={!isMobile} />
          </div>
        </div>
      </div>

      <div className="grid gap-4">
        <div className="flex flex-col gap-3">
          <TipTapEditorPreview content={content} />

          <ImagePreview
            srcs={previews}
            maxImages={totalFiles < 4 ? totalFiles + 1 : 4}
            className="size-full max-h-80"
            containerClassName={cn(
              'grid gap-3',
              totalFiles === 1 && 'grid-cols-1',
              totalFiles === 2 && 'grid-cols-2',
              totalFiles >= 3 && 'grid-cols-2 sm:grid-cols-3'
            )}
          />
        </div>
      </div>

      <Button onClick={onBack} className="w-fit">
        <Undo2 />
        {t('back')}
      </Button>
    </Card>
  )
}
