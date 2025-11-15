import { Image } from 'lucide-react'

import { type KeyboardEvent, useEffect, useState } from 'react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import {
  Card,
  ImagePreview,
  InputUpload,
  TextAreaAutoHeight,
  Typography
} from '@/components/shared'
import * as Person from '@/components/shared/Person'
import {
  Button,
  Field,
  FieldError,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import { paths } from '@/config'
import { useFormCreatePost } from '@/features/posts/hooks'

import { useAuthStore } from '@/stores'
import { cn } from '@/utils'

export const FormCreatePost = () => {
  const [files, setFiles] = useState<File[]>()
  const [previews, setPreviews] = useState<string[]>([])

  const { user } = useAuthStore()
  const { control, onSubmit, errors, isPending } = useFormCreatePost({
    files: Array.from(files ?? []),
    onSuccessCallback: () => {
      setFiles(undefined)
      setPreviews([])
    }
  })

  const { t } = useTranslation()

  useEffect(() => {
    if (!files) {
      return
    }

    const urls = Object.values(files).map((file) => URL.createObjectURL(file))
    setPreviews(urls)

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [files])

  const onChange = (files: File[]) => setFiles(files)

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      onSubmit()
    }
  }

  const onDeleteImage = (index: number) => {
    setPreviews((prev) => prev.filter((_, i) => i !== index))
    setFiles((prev) => prev?.filter((_, i) => i !== index))
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Link to={paths.user.byId(String(user?.id))}>
              <Person.Avatar size={48} className="size-12" />
            </Link>

            <Field className="flex w-full flex-col gap-2">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TextAreaAutoHeight onKeyDown={onKeyDown} {...field} />
                )}
              />
              <FieldError>{errors.content?.message}</FieldError>
            </Field>
          </div>

          <ImagePreview
            srcs={previews}
            className="size-full"
            maxImages={3}
            showDeleteIcon
            onDeleteImage={onDeleteImage}
            containerClassName={cn(
              'grid grid-cols-2 gap-4 mt-5 w-[calc(100%-48px-16px)] self-end',
              previews.length >= 3 && 'grid-cols-3'
            )}
          />

          <div className="flex items-center justify-between gap-3 pt-5">
            <div className="flex items-center gap-3">
              <Tooltip>
                <InputUpload accept="image/*" onChange={onChange} multiple>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      className="bg-muted-foreground/7 gap-1 rounded-lg"
                    >
                      <Image className="text-green-500" />
                      <Typography.Text className="text-sm opacity-70">
                        {t('photo')}
                      </Typography.Text>
                    </Button>
                  </TooltipTrigger>
                </InputUpload>
                <TooltipContent>
                  {t('attach')} {t('photo').toLowerCase()}
                </TooltipContent>
              </Tooltip>
            </div>

            <Button type="submit" loading={isPending}>
              {t('publish')} {t('post').toLowerCase()}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
