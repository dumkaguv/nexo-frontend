import { UserAvatar, UserFullName, UserNickname } from '@/entities/user'

import type { ResponseUserProfileDto } from '@/shared/api'

type Props = {
  user: ResponseUserProfileDto
}

export const StoryViewerListItem = ({ user }: Props) => {
  return (
    <div className="flex items-center gap-2.5">
      <UserAvatar user={user} />

      <div className="flex flex-col items-start">
        <UserFullName
          name={user.profile.fullName}
          className="text-sm max-lg:text-base"
        />
        <UserNickname nickname={user.username} />
      </div>
    </div>
  )
}
