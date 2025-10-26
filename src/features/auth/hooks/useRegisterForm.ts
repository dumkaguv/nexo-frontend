import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { authControllerRegisterMutation } from '@/api'
import { paths } from '@/config'

import {
  type RegisterFormSchema,
  createRegisterFormSchema
} from '@/features/auth/zodSchemas'
import { saveAccessToken, showApiErrors } from '@/utils'

import type { InputField } from '@/features/auth/types'

export const useRegisterForm = () => {
  const { t } = useTranslation()

  const schema = createRegisterFormSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(schema)
  })

  const navigate = useNavigate()

  const { mutateAsync: registerMutate, isPending } = useMutation({
    ...authControllerRegisterMutation(),
    onSuccess: ({ data: { accessToken } }) => {
      toast.success(t('auth.loginSuccess'))
      saveAccessToken(accessToken)
      navigate(paths.home.root)
    },
    onError: (error) => showApiErrors(error, t('auth.loginError'))
  })

  const onSubmit = async (body: RegisterFormSchema) =>
    await registerMutate({ body })

  const inputFields: InputField<RegisterFormSchema>[] = [
    {
      name: 'email',
      label: t('auth.email'),
      type: 'text',
      placeholder: 'alex-johnson@gmail.com',
      id: 'email',
      autoComplete: 'email'
    },
    {
      name: 'username',
      label: t('auth.username'),
      type: 'text',
      placeholder: 'alex_j',
      id: 'username',
      autoComplete: 'username'
    },
    {
      name: 'fullName',
      label: t('auth.fullName'),
      type: 'text',
      placeholder: 'Alex Johnson',
      id: 'full-name',
      autoComplete: 'name'
    },
    {
      name: 'password',
      label: t('auth.password'),
      type: 'password',
      placeholder: 'sHa$#as34Kh^',
      id: 'password',
      autoComplete: 'new-password'
    },
    {
      name: 'confirmPassword',
      label: t('auth.confirmPassword'),
      type: 'password',
      placeholder: 'sHa$#as34Kh^',
      id: 'confirm-password',
      autoComplete: 'new-password'
    }
  ]

  return {
    isPending,
    onSubmit: handleSubmit(onSubmit),
    register,
    errors,
    inputFields
  }
}
