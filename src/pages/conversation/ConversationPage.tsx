import { Outlet, useLocation, useParams } from 'react-router-dom'

import { BreakpointsMax, paths } from '@/shared/config'
import { useMaxWidth } from '@/shared/hooks'
import { ConversationNotSelected, Sidebar } from '@/widgets/conversation'
import { useConversationsWebsocket } from '@/widgets/conversation/model'

export const ConversationPage = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const isMobile = useMaxWidth(BreakpointsMax.md)

  useConversationsWebsocket()

  const isNewConversationPath = pathname === paths.conversations.new
  const isChatRoute = !!id || isNewConversationPath

  const showSidebar = !isMobile || !isChatRoute
  const showChat = !isMobile || isChatRoute

  return (
    <div className="flex items-stretch gap-5 max-lg:gap-3">
      {showSidebar && <Sidebar />}

      {showChat && (
        <main className="flex w-full flex-1 flex-col gap-6 sm:gap-8">
          {id || isNewConversationPath ? (
            <Outlet />
          ) : (
            <ConversationNotSelected />
          )}
        </main>
      )}
    </div>
  )
}
