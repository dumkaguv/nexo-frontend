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
    files: FileList | null,
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
            <Field className="mb-5">
              <InputUpload
                accept="image/*"
                multiple={false}
                value={field.value}
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
