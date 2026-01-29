import { CreatePostForm } from '@/features/post'
import { Sidebar, SidebarRight } from '@/widgets/feed'
import { PostList } from '@/widgets/post'

export const FeedPage = () => (
  <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
    <Sidebar />

    <main className="flex w-full flex-1 flex-col gap-6 sm:gap-8">
      <CreatePostForm />

      <PostList />
    </main>

    <SidebarRight />
  </div>
)
