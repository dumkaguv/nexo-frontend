import { Controller } from 'react-hook-form'

import { InputFieldErrors, InputUpload } from '@/components/shared'

import { Section } from './Section'
import { useUploadAvatar } from '../hooks'

export const FormUploadAvatar = () => {
  const {
    handleSubmit,
    onSubmit,
    onFileChange,
    control,
    errors,
    previewUrl,
    fileSizeError,
    isPending
  } = useUploadAvatar()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section title="uploadAvatar" isPending={isPending}>
        {previewUrl ? (
          <img
            src={previewUrl}
            alt=""
            className="my-4 h-48 w-48 rounded-full border border-dashed object-cover"
          />
        ) : (
          <div className="text-muted-foreground my-4 flex h-48 w-48 items-center justify-center rounded-full border border-dashed" />
        )}

        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <div className="mb-5">
              <InputUpload
                accept="image/*"
                multiple={false}
                value={field.value}
                onChange={(files) => {
                  field.onChange(files)
                  onFileChange(files)
                }}
              />
              <InputFieldErrors
                message={errors.avatar?.message || fileSizeError}
              />
            </div>
          )}
        />
      </Section>
    </form>
  )
}
