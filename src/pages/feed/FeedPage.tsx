import { CreatePostForm } from '@/features/post'
import { Card } from '@/shared/ui'
import { Sidebar, SidebarRight } from '@/widgets/feed'
import { PostList } from '@/widgets/post'
import { StoryRail } from '@/widgets/story'

export const FeedPage = () => {
  return (
    <div className="flex gap-5 max-xl:gap-4">
      <div className="flex flex-col gap-3 self-start max-md:hidden lg:sticky lg:top-[calc(var(--header-height)+20px)] lg:min-w-75">
        <Sidebar className="lg:min-w-75" />
        <SidebarRight className="lg:min-w-75 xl:hidden" />
      </div>

      <main className="flex w-full flex-1 flex-col gap-8 max-lg:gap-6">
        <Card>
          <StoryRail
            mode="all"
            className="min-w-0 overflow-hidden"
            showCreate
          />
        </Card>

        <CreatePostForm />

        <PostList />
      </main>

      <SidebarRight className="max-xl:hidden" />
    </div>
  )
}
