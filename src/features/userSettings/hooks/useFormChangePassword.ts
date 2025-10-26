import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { userControllerChangePasswordMutation } from '@/api'
import {
  type CreateChangePasswordSchema,
  createChangePasswordSchema
} from '@/features/userSettings/zodSchemas'
import { useAuthStore } from '@/stores'
import { showApiErrors } from '@/utils'

export const useFormChangePassword = () => {
  const { user } = useAuthStore()

  const { t } = useTranslation()

  const schema = createChangePasswordSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateChangePasswordSchema>({
    resolver: zodResolver(schema)
  })

  const { mutateAsync, isPending } = useMutation({
    ...userControllerChangePasswordMutation(),
    onSuccess: () => toast.success(t('success')),
    onError: (error) => showApiErrors(error)
  })

  const onSubmit = async ({
    oldPassword,
    newPassword
  }: CreateChangePasswordSchema) =>
    await mutateAsync({
      body: { oldPassword, newPassword },
      path: { id: String(user?.id) }
    })

  return {
    register,
    handleSubmit,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isPending
  }
}
