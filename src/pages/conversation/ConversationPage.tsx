import { Outlet } from 'react-router-dom'

import { Sidebar } from '@/widgets/conversation'
import { useConversationsWebsocket } from '@/widgets/conversation/model'

export const ConversationPage = () => {
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
