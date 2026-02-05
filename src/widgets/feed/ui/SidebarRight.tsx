import { useTranslation } from 'react-i18next'

import { Typography } from '@/shared/ui'

import { Sidebar, type SidebarProps } from '@/shared/ui/shadcn'

import { WhoToFollowList } from './who-to-follow'

export const SidebarRight = (props: SidebarProps) => {
  const { t } = useTranslation()

  return (
    <Sidebar {...props}>
      <div className="flex w-full flex-col items-start gap-3">
        <Typography.Title level={3} className="text-base">
          {t('whoToFollow')}
        </Typography.Title>

        <WhoToFollowList />
      </div>
    </Sidebar>
  )
}
