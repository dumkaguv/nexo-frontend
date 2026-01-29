import { useAuthStore } from '@/entities/session'
import { DeletePostAction, EditPostAction } from '@/features/post'
import { ButtonMoreActions } from '@/shared/ui'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/shared/ui/shadcn'

import type { ResponsePostDto } from '@/shared/api'

type Props = {
  post: ResponsePostDto
  onButtonEdit?: () => void
}

export const PostMoreActions = ({ post, onButtonEdit }: Props) => {
  const { user } = useAuthStore()

  const isOwner = post.user.id === user?.id

  if (!isOwner) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <ButtonMoreActions />
      </PopoverTrigger>

      <PopoverContent className="w-fit px-1 py-2 text-sm">
        <div className="flex flex-col gap-2">
          <EditPostAction onEdit={onButtonEdit} />

          <Separator className="relative right-1 w-[calc(100%+8px)]!" />

          <DeletePostAction postId={post.id} />
        </div>
      </PopoverContent>
    </Popover>
  )
}
