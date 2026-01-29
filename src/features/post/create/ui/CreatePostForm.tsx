import { useCallback, useState } from 'react'

import { PostForm } from '@/features/post'

import { useCreatePostForm } from '../model'

type Props = {
  onSuccessCallback?: () => void
}

export const CreatePostForm = ({ onSuccessCallback }: Props) => {
  const [files, setFiles] = useState<File[] | undefined>()
  const [resetSignal, setResetSignal] = useState(0)

  const { control, onSubmit, errors, isPending } = useCreatePostForm({
    files,
    onSuccessCallback: () => {
      setFiles(undefined)
      setResetSignal((prev) => prev + 1)
      onSuccessCallback?.()
    }
  })

  const onFilesChange = useCallback((nextFiles?: File[]) => {
    setFiles(nextFiles)
  }, [])

  return (
    <PostForm
      control={control}
      errors={errors}
      onSubmit={onSubmit}
      isPending={isPending}
      initialPreviews={[]}
      resetSignal={resetSignal}
      onFilesChange={(f) => onFilesChange(f)}
    />
  )
}
