import { SquareUser } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/shadcn'

type Props = {
  isFollowersTab?: boolean
}

export const SubscriptionListEmpty = ({ isFollowersTab = true }: Props) => {
  const { t } = useTranslation()

  return (
    <Empty className="p-5 md:p-7">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SquareUser />
        </EmptyMedia>
        <EmptyTitle>
          {t(isFollowersTab ? 'noFollowersYet' : 'noFollowingYet')}
        </EmptyTitle>
        <EmptyDescription>
          {t(
            isFollowersTab
              ? 'noFollowersYetDescription'
              : 'noFollowingYetDescription'
          )}
        </EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
