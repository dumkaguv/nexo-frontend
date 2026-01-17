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

  const { mutate: registerMutate, isPending } = useMutation({
    ...authControllerRegisterMutation(),
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

  const onSubmit = (body: RegisterFormSchema) => registerMutate({ body })

  const inputFields: InputField<RegisterFormSchema>[] = [
    {
      name: 'email',
      label: t('email'),
      type: 'text',
      placeholder: 'alex-johnson@gmail.com',
      id: 'email',
      autoComplete: 'email'
    },
    {
      name: 'username',
      label: t('username'),
      type: 'text',
      placeholder: 'alex_j',
      id: 'username',
      autoComplete: 'username'
    },
    {
      name: 'fullName',
      label: t('authFullName'),
      type: 'text',
      placeholder: 'Alex Johnson',
      id: 'full-name',
      autoComplete: 'name'
    },
    {
      name: 'password',
      label: t('password'),
      type: 'password',
      placeholder: 'sHa$#as34Kh^',
      id: 'password',
      autoComplete: 'new-password'
    },
    {
      name: 'confirmPassword',
      label: t('confirmPassword'),
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
