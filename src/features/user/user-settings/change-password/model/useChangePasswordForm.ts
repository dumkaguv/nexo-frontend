import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { useAuthStore } from '@/entities/session'
import { userControllerChangePasswordMutation } from '@/shared/api'
import { showApiErrors } from '@/shared/lib'

import {
  createChangePasswordSchema,
  type ChangePasswordSchema
} from '../contracts'

export const useChangePasswordForm = () => {
  const { user } = useAuthStore()

  const { t } = useTranslation()

  const schema = createChangePasswordSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(schema)
  })

  const { mutate: changePassword, isPending } = useMutation({
    ...userControllerChangePasswordMutation(),
    onSuccess: () => toast.success(t('success')),
    onError: (error) => showApiErrors(error)
  })

  const onSubmit = ({ oldPassword, newPassword }: ChangePasswordSchema) =>
    changePassword({
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
