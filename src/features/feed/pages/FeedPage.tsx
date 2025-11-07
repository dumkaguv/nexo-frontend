import { Sidebar, SidebarRight } from '@/features/feed/components'
import { FormCreatePost, PostList } from '@/features/posts/components'

export const FeedPage = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <main className="flex w-full flex-1 flex-col gap-8">
        <FormCreatePost />

        <PostList />
      </main>

      <SidebarRight />
    </div>
  )
}
