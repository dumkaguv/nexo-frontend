import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { authControllerLoginMutation } from '@/api'
import { paths } from '@/config'

import {
  type LoginFormSchema,
  createLoginFormSchema
} from '@/features/auth/zodSchemas'
import { saveAccessToken, showApiErrors } from '@/utils'

import type { CreateLoginDto } from '@/api'
import type { InputField } from '@/features/auth/types'

export const useLoginForm = () => {
  const { t } = useTranslation()

  const schema = createLoginFormSchema(t)

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(schema)
  })

  const navigate = useNavigate()

  const { mutateAsync: loginMutate, isPending } = useMutation({
    ...authControllerLoginMutation(),
    onSuccess: ({ data: { accessToken } }) => {
      toast.success(t('auth.loginSuccess'))
      saveAccessToken(accessToken)
      navigate(paths.home.root)
    },
    onError: (error) => showApiErrors(error, t('auth.loginError'))
  })

  const onSubmit = async (data: CreateLoginDto) =>
    await loginMutate({ body: data })

  const inputFields: InputField<LoginFormSchema>[] = [
    {
      name: 'email',
      label: t('auth.email'),
      type: 'text',
      placeholder: 'alex-johnson@gmail.com',
      id: 'email',
      autoComplete: 'email'
    },
    {
      name: 'password',
      label: t('auth.password'),
      type: 'password',
      placeholder: 'sHa$#as34Kh^',
      id: 'password',
      autoComplete: 'current-password'
    }
  ]

  return {
    isPending,
    onSubmit: handleSubmit(onSubmit),
    loginMutate,
    register,
    errors,
    inputFields
  }
}
