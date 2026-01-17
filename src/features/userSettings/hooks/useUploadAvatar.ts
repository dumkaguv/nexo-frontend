import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postControllerFindAllInfiniteQueryKey,
  profileControllerMeDetailedOptions,
  profileControllerUpdateMutation,
  uploadControllerDeleteMutation,
  uploadControllerUploadMutation
} from '@/api'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

import { createAvatarSchema, type CreateAvatarSchema } from '@/zodSchemas'

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

  const { refetch: fetchMe } = useQuery({
    ...profileControllerMeDetailedOptions(),
    enabled: false
  })

  const { mutateAsync: updateProfile, isPending: isUpdatingUser } = useMutation(
    {
      ...profileControllerUpdateMutation(),
      onError: (e) => showApiErrors(e)
    }
  )

  const { mutateAsync: deleteFile, isPending: isDeleting } = useMutation({
    ...uploadControllerDeleteMutation(),
    onError: (e) => showApiErrors(e)
  })

  const { mutateAsync: uploadAvatar, isPending } = useMutation({
    ...uploadControllerUploadMutation(),
    onSuccess: async ({ data }) => {
      await updateProfile({ body: { avatar: data?.id } })
      const response = await fetchMe()

      await invalidateQueries([
        postControllerFindAllInfiniteQueryKey(),
        profileControllerMeDetailedOptions()
      ])
      setUser(response?.data?.data?.user)
      toast.success(t('uploadSuccess'))
    },
    onError: (e) => showApiErrors(e)
  })

  useEffect(() => {
    if (!user?.profile?.avatar?.url) {
      return
    }

    setPreviewUrl(user.profile.avatar?.url)
  }, [user])

  useEffect(
    () => () => {
      if (previewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(previewUrl)
      }
    },
    [previewUrl]
  )

  const onFileChange = (files: File[] | null) => {
    if (files && files.length > 0) {
      const file = files[0]

      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(t('fileTooLarge', { max: MAX_FILE_SIZE_MB }))

        return
      }

      setFile(file)
      setPreviewUrl(URL.createObjectURL(file))
    } else {
      setPreviewUrl(undefined)
      setFile(undefined)
    }
  }

  const onSubmit = async () => {
    if (!file) {
      return
    }

    const hasAvatar = !!user?.profile.avatar

    if (hasAvatar) {
      await deleteFile({ path: { id: String(user.profile.avatar?.id) } })
    }

    await uploadAvatar({ body: { file: file, folder: 'avatars' } })
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    onFileChange,
    control,
    errors,
    previewUrl,
    fileSizeError,
    uploadAvatar,
    isPending: isUpdatingUser || isPending || isDeleting,
    file
  }
}
