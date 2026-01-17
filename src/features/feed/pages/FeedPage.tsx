import { PostList } from '@/components/shared'
import { Sidebar, SidebarRight } from '@/features/feed/components'
import { PostCreateForm } from '@/features/posts/components'

export const FeedPage = () => (
  <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
    <Sidebar />

    <main className="flex w-full flex-1 flex-col gap-6 sm:gap-8">
      <PostCreateForm />

      <PostList />
    </main>

    <SidebarRight />
  </div>
)
