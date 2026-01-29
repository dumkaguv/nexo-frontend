import { useCallback, useMemo, useState } from 'react'

import { PostForm } from '@/features/post'

import { useEditPostForm } from '../model'

import type { ResponsePostDto } from '@/shared/api'

type Props = {
  post: ResponsePostDto
  onCancelEdit?: () => void
  onSuccessCallback?: () => void
}

export const EditPostForm = ({
  post,
  onCancelEdit,
  onSuccessCallback
}: Props) => {
  const initialPreviews = useMemo(
    () => post.files?.map(({ file }) => file?.url).filter(Boolean) ?? [],
    [post.files]
  )

  const [files, setFiles] = useState<File[] | undefined>()
  const [previews, setPreviews] = useState<string[]>(initialPreviews)

  const { control, onSubmit, errors, isPending } = useEditPostForm({
    post,
    files,
    previews,
    onSuccessCallback
  })

  const onFilesChange = useCallback(
    (nextFiles?: File[], nextPreviews?: string[]) => {
      setFiles(nextFiles)

      if (nextPreviews) {
        setPreviews(nextPreviews)
      }
    },
    []
  )

  return (
    <PostForm
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      isPending={isPending}
      initialPreviews={initialPreviews}
      isEditing
      onCancelEdit={onCancelEdit}
      onFilesChange={onFilesChange}
    />
  )
}
