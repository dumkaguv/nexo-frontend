import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/features/conversations/components'

import { useConversationsWebsocket } from '@/features/conversations/hooks'

export const ConversationsPage = () => {
  useConversationsWebsocket()

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
      <Sidebar />

      <main className="flex h-full w-full flex-1 flex-col gap-6 sm:gap-8">
        <Outlet />
      </main>
    </div>
  )
}
