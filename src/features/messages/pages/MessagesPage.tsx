import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/features/messages/components'

export const MessagesPage = () => {
  return (
    <div className="flex gap-5">
      <Sidebar />

      <main className="flex w-full flex-1 flex-col gap-8">
        <Outlet />
      </main>
    </div>
  )
}
