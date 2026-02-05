import { SquareUser } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { useAuthStore } from '@/entities/session'

import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/shared/ui/shadcn'

type Props = {
  isFollowersTab?: boolean
  userId?: number
}

export const SubscriptionListEmpty = ({
  isFollowersTab = true,
  userId
}: Props) => {
  const { t } = useTranslation()
  const { user } = useAuthStore()

  const isMe = userId ? Number(user?.id) === Number(userId) : true

  let emptyTitleKey = 'noFollowersYet'
  let emptyDescriptionKey = 'noFollowersYetDescription'

  if (!isFollowersTab) {
    emptyTitleKey = 'noFollowingYet'
    emptyDescriptionKey = 'noFollowingYetDescription'
  }

  if (!isMe) {
    if (emptyTitleKey === 'noFollowersYet') {
      emptyTitleKey = 'noFollowersYetOther'
    } else {
      emptyTitleKey = 'noFollowingYetOther'
    }

    if (emptyDescriptionKey === 'noFollowersYetDescription') {
      emptyDescriptionKey = 'noFollowersYetDescriptionOther'
    } else {
      emptyDescriptionKey = 'noFollowingYetDescriptionOther'
    }
  }

  return (
    <Empty className="p-3.5 lg:p-7">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <SquareUser />
        </EmptyMedia>
        <EmptyTitle>{t(emptyTitleKey)}</EmptyTitle>
        <EmptyDescription>{t(emptyDescriptionKey)}</EmptyDescription>
      </EmptyHeader>
    </Empty>
  )
}
