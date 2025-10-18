import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useTranslation } from 'react-i18next'

import {
  type CreateChangePasswordSchema,
  createChangePasswordSchema
} from '@/features/userSettings/zodSchemas'
import { Api } from '@/services/apiClient'
import { handleMutationError } from '@/utils'

export const useFormChangePassword = () => {
  const { t } = useTranslation()

  const schema = createChangePasswordSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateChangePasswordSchema>({
    resolver: zodResolver(schema)
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateChangePasswordSchema) =>
      Api.users.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword
      }),
    onSuccess: (response) => toast.success(response.message ?? t('success')),
    onError: (error) => handleMutationError(error)
  })

  const onSubmit = (data: CreateChangePasswordSchema) => mutate(data)

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending
  }
}
