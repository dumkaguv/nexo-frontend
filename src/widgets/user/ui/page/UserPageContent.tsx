import { useAuthStore } from '@/entities/session'
import { Breakpoints } from '@/shared/config'
import { useMaxWidth } from '@/shared/hooks'
import { Card } from '@/shared/ui'
import { Sidebar as SidebarUi } from '@/shared/ui/shadcn'

import { SidebarRight } from '@/widgets/feed'
import { StoryRail } from '@/widgets/story'

import { MainInfo } from './MainInfo'
import { MyPosts } from './MyPosts'
import { Sidebar } from './Sidebar'

import { UserPageSkeleton } from './UserPageSkeleton'

import type { ResponseUserDto } from '@/shared/api'

type Props = {
  userData?: ResponseUserDto
  isLoading?: boolean
}

export const UserPageContent = ({ userData, isLoading }: Props) => {
  const { user } = useAuthStore()
  const isTablet = useMaxWidth(Breakpoints.lg)
  const isMobile = useMaxWidth(Breakpoints.md)
  const isMe = Number(user?.id) === Number(userData?.id)

  if (isLoading) {
    return <UserPageSkeleton showMyPosts={!!isMe} />
  }

  return (
    <div className="flex gap-6">
      <div className="flex w-full flex-col gap-8 max-lg:gap-5">
        <Card className="flex w-full flex-col gap-5 max-lg:gap-3">
          <MainInfo userData={userData} isLoading={isLoading} />

          <StoryRail user={userData} showCreate={isMe} />
        </Card>

        {isMe && isMobile && (
          <SidebarRight className="w-full max-w-none max-lg:max-w-none" />
        )}

        {isMe && <MyPosts />}
      </div>

      {!isTablet && (
        <SidebarUi className="w-full lg:max-w-85" bodyClassName="items-start">
          <Sidebar userData={userData} />
        </SidebarUi>
      )}
    </div>
  )
}
