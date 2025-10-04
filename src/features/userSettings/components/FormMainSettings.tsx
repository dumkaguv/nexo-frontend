import { Controller } from 'react-hook-form'

import { useTranslation } from 'react-i18next'

import { DatePicker, InputFieldErrors } from '@/components/shared'
import { Input, Label, Textarea } from '@/components/ui'
import { useMainAccountSettingsForm } from '@/features/userSettings/hooks'

import { Section } from './Section'

export const FormMainSettings = () => {
  const { handleSubmit, onSubmit, register, control, errors, isPending } =
    useMainAccountSettingsForm()

  const { t } = useTranslation()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section
        title="mainSettings"
        isPending={isPending}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-5">
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="email">{t('auth.email')}</Label>
            <Input id="email" {...register('email')} />
            <InputFieldErrors message={errors.email?.message} />
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="userName">{t('nickName')}</Label>
            <Input id="userName" {...register('userName')} />
            <InputFieldErrors message={errors.userName?.message} />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="fullName">{t('fullName')}</Label>
            <Input id="fullName" {...register('fullName')} />
            <InputFieldErrors message={errors.fullName?.message} />
          </div>
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="phone">{t('phone')}</Label>
            <Input id="phone" {...register('phone')} />
            <InputFieldErrors message={errors.phone?.message} />
          </div>
        </div>

        <div className="flex w-full flex-col gap-1">
          <Label htmlFor="bio">{t('bio')}</Label>
          <Textarea
            id="bio"
            {...register('bio')}
            placeholder={t('inputs.bioPlaceholder')}
          />{' '}
          <InputFieldErrors message={errors.bio?.message} />
        </div>

        <Controller
          control={control}
          name="birthDay"
          render={({ field }) => (
            <div className="flex w-full flex-col gap-1">
              <Label htmlFor="birthDay">{t('birthDay')}</Label>
              <DatePicker field={field} />
              <InputFieldErrors message={errors.birthDay?.message} />
            </div>
          )}
        />
      </Section>
    </form>
  )
}
