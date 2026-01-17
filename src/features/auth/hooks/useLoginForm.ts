import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

import { authControllerLoginMutation, type CreateLoginDto } from '@/api'
import { paths } from '@/config'

import {
  type LoginFormSchema,
  createLoginFormSchema
} from '@/features/auth/zodSchemas'
import { saveAccessToken, showApiErrors } from '@/utils'

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

  const { mutate: loginMutate, isPending } = useMutation({
    ...authControllerLoginMutation(),
    onSuccess: ({ data }) => {
      if (!data?.accessToken) {
        toast.error(t('loginError'))

        return
      }

      toast.success(t('loginSuccess'))
      saveAccessToken(data.accessToken)
      void navigate(paths.home.root)
    },
    onError: (error) => showApiErrors(error, t('loginError'))
  })

  const onSubmit = (data: CreateLoginDto) => loginMutate({ body: data })

  const inputFields: InputField<LoginFormSchema>[] = [
    {
      name: 'email',
      label: t('email'),
      type: 'text',
      placeholder: 'alex-johnson@gmail.com',
      id: 'email',
      autoComplete: 'email'
    },
    {
      name: 'password',
      label: t('password'),
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
