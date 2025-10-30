import { useTranslation } from 'react-i18next'

import { Typography } from '@/components/shared'
import { Sidebar } from '@/components/ui'

import { WhoToFollowList } from './WhoToFollow'

const { Title } = Typography

export const SidebarRight = () => {
  const { t } = useTranslation()

  return (
    <Sidebar>
      <div className="flex w-full flex-col items-start gap-3">
        <Title level={3} className="text-base">
          {t('whoToFollow')}
        </Title>

        <WhoToFollowList />
      </div>
    </Sidebar>
  )
}
