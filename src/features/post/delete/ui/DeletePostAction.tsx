import { Trash } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { ModalConfirm } from '@/shared/ui'

import { Button } from '@/shared/ui/shadcn'

import { useDeletePost } from '../model/useDeletePost'

import type { ResponsePostDto } from '@/shared/api'

type Props = {
  postId: ResponsePostDto['id']
}

export const DeletePostAction = ({ postId }: Props) => {
  const { t } = useTranslation()

  const { deletePost, isPending } = useDeletePost()

  const onDelete = () => void deletePost({ path: { id: String(postId) } })

  return (
    <ModalConfirm onOk={onDelete} okButtonProps={{ loading: isPending }}>
      <Button
        variant="destructive"
        size="sm"
        className="bg-destructive/90 justify-start"
      >
        <Trash />
        {t('delete')}
      </Button>
    </ModalConfirm>
  )
}
