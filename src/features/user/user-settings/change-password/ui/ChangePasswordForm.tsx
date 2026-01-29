import { useTranslation } from 'react-i18next'

import { Section } from '@/features/user/user-settings/ui'
import { InputPassword } from '@/shared/ui'
import { Field, FieldError, FieldLabel } from '@/shared/ui/shadcn'

import { useChangePasswordForm } from '../model'

export const ChangePasswordForm = () => {
  const { register, errors, onSubmit, isPending } = useChangePasswordForm()

  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit}>
      <Section
        titleKey="changePassword"
        isPending={isPending}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="oldPassword">
              {t('currentPassword')}
            </FieldLabel>
            <InputPassword id="oldPassword" {...register('oldPassword')} />
            <FieldError>{errors.oldPassword?.message}</FieldError>
          </Field>

          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="newPassword">{t('newPassword')}</FieldLabel>
            <InputPassword id="newPassword" {...register('newPassword')} />
            <FieldError>{errors.newPassword?.message}</FieldError>
          </Field>

          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="confirmNewPassword">
              {t('confirmNewPassword')}
            </FieldLabel>
            <InputPassword
              id="confirmNewPassword"
              {...register('confirmNewPassword')}
            />
            <FieldError>{errors.confirmNewPassword?.message}</FieldError>
          </Field>
        </div>
      </Section>
    </form>
  )
}
