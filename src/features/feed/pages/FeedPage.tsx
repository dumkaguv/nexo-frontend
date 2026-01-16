import { PostList } from '@/components/shared'
import { Sidebar, SidebarRight } from '@/features/feed/components'
import { CreatePostForm } from '@/features/posts/components'

export const FeedPage = () => (
  <div className="flex gap-5">
    <Sidebar />

    <main className="flex w-full flex-1 flex-col gap-8">
      <CreatePostForm />

      <PostList />
    </main>

    <SidebarRight />
  </div>
)
