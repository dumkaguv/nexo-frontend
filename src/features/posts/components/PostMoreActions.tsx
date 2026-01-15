import { useMutation } from '@tanstack/react-query'
import { Edit, Trash } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { toast } from 'sonner'

import {
  type ResponsePostDto,
  postControllerFindAllInfiniteQueryKey,
  postControllerFindAllMyQueryKey,
  postControllerRemoveMutation
} from '@/api'
import { ButtonMoreActions, ModalConfirm } from '@/components/shared'
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator
} from '@/components/ui'

import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

type Props = {
  post: ResponsePostDto
  onButtonEdit?: () => void
}

export const PostMoreActions = ({ post, onButtonEdit }: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()
  const { invalidateQueries } = useInvalidatePredicateQueries()

  const { mutate: deleteAsync, isPending } = useMutation({
    ...postControllerRemoveMutation(),
    onSuccess: async () => {
      await invalidateQueries([
        postControllerFindAllInfiniteQueryKey(),
        postControllerFindAllMyQueryKey()
      ])
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const onDelete = () => deleteAsync({ path: { id: String(post.id) } })

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
          <Button
            variant="ghost"
            size="sm"
            onClick={onButtonEdit}
            className="w-full justify-start"
          >
            <Edit /> {t('edit')}
          </Button>

          <Separator className="relative right-1 w-[calc(100%+8px)]!" />

          <ModalConfirm onOk={onDelete} okButtonProps={{ loading: isPending }}>
            <Button
              variant="destructive"
              size="sm"
              className="bg-destructive/90 justify-start"
            >
              <Trash /> {t('delete')}
            </Button>
          </ModalConfirm>
        </div>
      </PopoverContent>
    </Popover>
  )
}
