import { Heart } from 'lucide-react'

import { Typography } from '@/components/shared'
import { Button } from '@/components/ui'

import type { ResponsePostDto } from '@/api'

const { Text } = Typography

type Props = {
  likes: ResponsePostDto['likes']
}

export const PostLike = ({ likes }: Props) => {
  // const {mutateAsync: likeAsync, isPending} = useMutation({
  //   ...,
  //   onSuccess: () => {},
  //   onError: (e) => showApiErrors(e)
  // })

  return (
    <div className="mt-2">
      <div className="flex items-center gap-1.5">
        <Button
          variant="text"
          size="icon"
          // loading={isPending}
          className="h-5 w-fit justify-start hover:scale-[1.05]"
        >
          <Heart />
        </Button>
        <Text className="text-sm">{likes?.length ?? 0}</Text>
      </div>
    </div>
  )
}
