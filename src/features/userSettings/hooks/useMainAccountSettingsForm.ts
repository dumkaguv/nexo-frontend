import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import dayjs from 'dayjs'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import {
  postControllerFindAllQueryKey,
  profileControllerMeQueryKey,
  profileControllerUpdateMutation,
  userControllerFindOneQueryKey,
  userControllerUpdateMutation
} from '@/api'
import {
  type AccountSettingsFormSchema,
  createAccountSettingsSchema
} from '@/features/userSettings/zodSchemas'
import { useInvalidatePredicateQueries } from '@/hooks'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

export const useMainAccountSettingsForm = () => {
  const { user, setUser, isPendingUser: isPendingUserStore } = useAuthStore()
  const { t } = useTranslation()
  const schema = createAccountSettingsSchema(t)

  const { invalidateQueries } = useInvalidatePredicateQueries()

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<AccountSettingsFormSchema>({
    resolver: zodResolver(schema),
    values: {
      email: user?.email ?? '',
      username: user?.username ?? '',
      fullName: user?.profile?.fullName ?? '',
      biography: user?.profile?.biography ?? '',
      phone: user?.profile?.phone ?? '',
      ...(user?.profile?.birthDay
        ? { birthDay: new Date(user.profile.birthDay) }
        : {})
    }
  })

  const stringUserId = String(user?.id)
  const { mutateAsync: updateProfile, isPending } = useMutation({
    ...profileControllerUpdateMutation(),
    onError: (e) => showApiErrors(e)
  })

  const { mutateAsync: updateUser, isPending: isPendingUser } = useMutation({
    ...userControllerUpdateMutation(),
    onSuccess: async ({ data }) => {
      await invalidateQueries([
        postControllerFindAllQueryKey(),
        profileControllerMeQueryKey(),
        userControllerFindOneQueryKey({ path: { id: stringUserId } })
      ])
      setUser(data)
      toast.success(t('success'))
    },
    onError: (e) => showApiErrors(e)
  })

  const onSubmit = async (body: AccountSettingsFormSchema) => {
    await updateProfile({
      body: {
        ...body,
        birthDay: dayjs(body.birthDay).toISOString()
      }
    })

    await updateUser({
      path: { id: stringUserId },
      body: { email: body.email, username: body.username }
    })
  }

  return {
    onSubmit: handleSubmit(onSubmit),
    control,
    register,
    errors,
    isPending: isPendingUser || isPending || isPendingUserStore
  }
}
