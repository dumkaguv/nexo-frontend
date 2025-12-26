import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { DatePicker, TipTapEditor } from '@/components/shared'
import { Field, FieldError, FieldLabel, Input } from '@/components/ui'
import { useMainAccountSettingsForm } from '@/features/userSettings/hooks'

import { Section } from './Section'

export const FormMainSettings = () => {
  const { onSubmit, register, control, errors, isPending } =
    useMainAccountSettingsForm()

  const { t } = useTranslation()

  return (
    <form onSubmit={onSubmit}>
      <Section
        title="mainSettings"
        isPending={isPending}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-5">
          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="email">{t('auth.email')}</FieldLabel>
            <Input id="email" {...register('email')} />
            <FieldError>{errors.email?.message}</FieldError>
          </Field>

          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="userName">{t('nickName')}</FieldLabel>
            <Input id="userName" {...register('username')} />
            <FieldError>{errors.username?.message}</FieldError>
          </Field>
        </div>

        <div className="flex gap-5">
          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="fullName">{t('fullName')}</FieldLabel>
            <Input id="fullName" {...register('fullName')} />
            <FieldError>{errors.fullName?.message}</FieldError>
          </Field>

          <Field className="flex w-full flex-col gap-1">
            <FieldLabel htmlFor="phone">{t('phone')}</FieldLabel>
            <Input id="phone" {...register('phone')} />
            <FieldError>{errors.phone?.message}</FieldError>
          </Field>
        </div>

        <Field className="flex w-full flex-col gap-1">
          <FieldLabel htmlFor="biography">{t('bio')}</FieldLabel>
          <Controller
            name="biography"
            control={control}
            render={({ field }) => <TipTapEditor {...field} />}
          />
          <FieldError>{errors.biography?.message}</FieldError>
        </Field>

        <Controller
          control={control}
          name="birthDay"
          render={({ field }) => (
            <Field className="flex w-full flex-col gap-1">
              <FieldLabel htmlFor="birthDay">{t('birthDay')}</FieldLabel>
              <DatePicker field={field} />
              <FieldError>{errors.birthDay?.message}</FieldError>
            </Field>
          )}
        />
      </Section>
    </form>
  )
}
