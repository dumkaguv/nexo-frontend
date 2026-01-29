import { Controller, type ControllerRenderProps } from 'react-hook-form'

import { Section } from '@/features/user/user-settings/ui'

import { ImagePreview, InputUpload } from '@/shared/ui'
import { Field, FieldError } from '@/shared/ui/shadcn'

import { useUploadAvatarForm } from '../model'

import type { AvatarSchema } from '@/shared/lib'

export const UploadAvatarForm = () => {
  const {
    onSubmit,
    onFileChange,
    control,
    errors,
    previewUrl,
    fileSizeError,
    isPending
  } = useUploadAvatarForm()

  const onChange = (
    files: File[] | null,
    field: ControllerRenderProps<AvatarSchema>
  ) => {
    field.onChange(files)
    onFileChange(files)
  }

  return (
    <form onSubmit={onSubmit}>
      <Section titleKey="uploadAvatar" isPending={isPending}>
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
