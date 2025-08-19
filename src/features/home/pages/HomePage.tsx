import { Sidebar, SidebarRight } from '@/components/shared'
import { FormCreatePost, PostsList } from '@/features/posts/components'

export const HomePage = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <main className="flex w-full flex-1 flex-col gap-8">
        <FormCreatePost />

        <PostsList />
      </main>

      <SidebarRight />
    </div>
  )
}
