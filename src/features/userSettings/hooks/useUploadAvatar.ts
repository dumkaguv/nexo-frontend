import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  profileControllerMeQueryKey,
  uploadControllerUploadAvatarMutation
} from '@/api'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

import { createAvatarSchema } from '@/zodSchemas'

import type { CreateAvatarSchema } from '@/zodSchemas'

const MAX_FILE_SIZE_MB = 4
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024

export const useUploadAvatar = () => {
  const { setUser, user } = useAuthStore()

  const [file, setFile] = useState<File>()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const [fileSizeError, setFileSizeError] = useState<string | undefined>()

  const { invalidateQueries } = useInvalidatePredicateQueries()
  const { t } = useTranslation()

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateAvatarSchema>({
    resolver: zodResolver(createAvatarSchema(t))
  })

  const { mutateAsync: uploadAvatar, isPending } = useMutation({
    ...uploadControllerUploadAvatarMutation(),
    onSuccess: async ({ data }) => {
      await invalidateQueries(profileControllerMeQueryKey())
      setUser(data)
      toast.success(t('uploadSuccess'))
    },
    onError: (e) => showApiErrors(e)
  })

  useEffect(() => {
    if (!user?.profile?.avatarUrl) return
    setPreviewUrl(user.profile.avatarUrl)
  }, [user])

  const onFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0]

      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(
          t('validation.fileTooLarge', { max: MAX_FILE_SIZE_MB })
        )
        return
      }

      setFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(undefined)
      setFile(undefined)
    }
  }

  const onSubmit = async () => await uploadAvatar({ body: { file: file! } })

  return {
    onSubmit: handleSubmit(onSubmit),
    onFileChange,
    control,
    errors,
    previewUrl,
    fileSizeError,
    uploadAvatar,
    isPending,
    file
  }
}
