import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/features/conversations/components'

export const ConversationsPage = () => (
  <div className="flex gap-5">
    <Sidebar />

    <main className="flex w-full flex-1 flex-col gap-8">
      <Outlet />
    </main>
  </div>
)
