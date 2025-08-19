import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

import { Routes } from '@/config'
import {
  type LoginFormSchema,
  createLoginFormSchema
} from '@/features/auth/zodSchemas'
import { Api } from '@/services/apiClient'
import { useAuthStore } from '@/stores'
import {
  getUserFromAuthResponse,
  handleMutationError,
  saveAccessToken
} from '@/utils'

import type { LoginPayload } from '@/services/auth'
import type { InputField } from '@/types'

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

  const { setUser } = useAuthStore()

  const navigate = useNavigate()

  const { mutateAsync: loginMutate, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => Api.auth.login(payload),
    onSuccess: ({ data, message }) => {
      if (data?.tokens.accessToken) {
        toast.success(message ?? t('auth.loginSuccess'))
        saveAccessToken(data.tokens.accessToken)
        setUser(getUserFromAuthResponse(data))
        navigate(Routes.home)
      }
    },
    onError: (error) => handleMutationError(error, t('auth.loginError'))
  })

  const onSubmit = async (data: LoginPayload) => await loginMutate(data)

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
