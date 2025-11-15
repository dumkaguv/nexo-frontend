import { Controller } from 'react-hook-form'

import { ImagePreview, InputUpload } from '@/components/shared'
import { Field, FieldError } from '@/components/ui'
import { useUploadAvatar } from '@/features/userSettings/hooks'

import { Section } from './Section'

import type { CreateAvatarSchema } from '@/zodSchemas'

import type { ControllerRenderProps } from 'react-hook-form'

export const FormUploadAvatar = () => {
  const {
    onSubmit,
    onFileChange,
    control,
    errors,
    previewUrl,
    fileSizeError,
    isPending
  } = useUploadAvatar()

  const onChange = (
    files: File[] | null,
    field: ControllerRenderProps<CreateAvatarSchema>
  ) => {
    field.onChange(files)
    onFileChange(files)
  }

  return (
    <form onSubmit={onSubmit}>
      <Section title="uploadAvatar" isPending={isPending}>
        {previewUrl ? (
          <ImagePreview
            srcs={[previewUrl]}
            className="my-4 size-40 rounded-full border border-dashed object-cover"
          />
        ) : (
          <div className="text-muted-foreground my-4 flex size-40 items-center justify-center rounded-full border border-dashed" />
        )}

        <Controller
          name="avatar"
          control={control}
          render={({ field }) => (
            <Field className="mb-5">
              <InputUpload
                accept="image/*"
                onChange={(files) => onChange(files, field)}
              />
              <FieldError>{errors.avatar?.message || fileSizeError}</FieldError>
            </Field>
          )}
        />
      </Section>
    </form>
  )
}
