import { useTranslation } from 'react-i18next'

import { InputPassword } from '@/components/shared'
import { Button, Field, FieldError, FieldLabel, Input } from '@/components/ui'
import { useRegisterForm } from '@/features/auth/hooks'

export const RegisterForm = () => {
  const { inputFields, register, errors, onSubmit, isPending } =
    useRegisterForm()

  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-5 text-start">
      {inputFields.map(
        ({ name, id, label, placeholder, type, autoComplete }) => {
          const inputProps = {
            ...register(name),
            id,
            placeholder,
            autoComplete
          }

          return (
            <Field key={name} className="flex flex-col gap-1">
              <FieldLabel htmlFor={id}>{label}</FieldLabel>
              {type === 'password' ? (
                <InputPassword {...inputProps} />
              ) : (
                <Input {...inputProps} />
              )}
              <FieldError>{errors[name]?.message}</FieldError>
            </Field>
          )
        }
      )}

      <Button
        type="submit"
        loading={isPending}
        className="mt-2 h-12 w-full text-lg"
      >
        {t('signUp')}
      </Button>
    </form>
  )
}
