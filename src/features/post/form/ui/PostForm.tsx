import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type BaseSyntheticEvent
} from 'react'
import {
  Controller,
  useWatch,
  type Control,
  type FieldErrors
} from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { useAuthStore } from '@/entities/session'
import { UserAvatar } from '@/entities/user'
import { BreakpointsMax, paths } from '@/shared/config'
import { useMaxWidth } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Card, ImagePreview, TipTapEditor } from '@/shared/ui'
import { Field, FieldError, Skeleton } from '@/shared/ui/shadcn'

import { PostFormActions } from './PostFormActions'
import { PostPreview } from './PostPreview'

import type { PostSchema } from '@/features/post/create/contracts'
import type { PostSchema as EditPostSchema } from '@/features/post/edit/contracts'

type Props = {
  control: Control<PostSchema | EditPostSchema>
  errors: FieldErrors<PostSchema | EditPostSchema>
  onSubmit: (e?: BaseSyntheticEvent) => void
  isPending: boolean

  initialPreviews?: string[]
  resetSignal?: number

  isEditing?: boolean
  onCancelEdit?: () => void

  onFilesChange?: (files?: File[], previews?: string[]) => void
}

export const PostForm = ({
  control,
  errors,
  onSubmit,
  isPending,
  initialPreviews = [],
  resetSignal,
  isEditing,
  onCancelEdit,
  onFilesChange
}: Props) => {
  const [remotePreviews, setRemotePreviews] =
    useState<string[]>(initialPreviews)
  const [localPreviews, setLocalPreviews] = useState<
    { file: File; url: string }[]
  >([])
  const [isPreview, setIsPreview] = useState(false)

  const { user, isUserLoading } = useAuthStore()
  const { t } = useTranslation()
  const content = useWatch({ control, name: 'content' })

  const isTablet = useMaxWidth(BreakpointsMax.lg)

  const resetPreviews = useCallback(() => {
    setRemotePreviews(initialPreviews)
    setLocalPreviews((prev) => {
      prev.forEach((item) => URL.revokeObjectURL(item.url))

      return []
    })
  }, [initialPreviews])

  useEffect(() => {
    resetPreviews()
  }, [initialPreviews, resetPreviews])

  useEffect(() => {
    if (resetSignal === undefined) {
      return
    }

    resetPreviews()
  }, [resetPreviews, resetSignal])

  const localPreviewsRef = useRef(localPreviews)

  useEffect(() => {
    localPreviewsRef.current = localPreviews
  }, [localPreviews])

  useEffect(
    () => () => {
      localPreviewsRef.current.forEach((item) => {
        URL.revokeObjectURL(item.url)
      })
    },
    []
  )

  const previews = useMemo(
    () => [...remotePreviews, ...localPreviews.map((item) => item.url)],
    [remotePreviews, localPreviews]
  )

  const files = useMemo(
    () => localPreviews.map((item) => item.file),
    [localPreviews]
  )

  useEffect(() => {
    onFilesChange?.(files.length ? files : undefined, previews)
  }, [files, previews, onFilesChange])

  const onChange = (nextFiles: File[]) => {
    if (!nextFiles.length) {
      return
    }

    const nextPreviews = nextFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file)
    }))

    setLocalPreviews((prev) => [...prev, ...nextPreviews])
  }

  const onDeleteImage = (index: number) => {
    if (index < remotePreviews.length) {
      setRemotePreviews((prev) => prev.filter((_, i) => i !== index))

      return
    }

    const localIndex = index - remotePreviews.length

    setLocalPreviews((prev) => {
      const removed = prev[localIndex]

      if (removed) {
        URL.revokeObjectURL(removed.url)
      }

      return prev.filter((_, i) => i !== localIndex)
    })
  }

  const onTogglePreview = () => setIsPreview((prev) => !prev)

  if (isPreview) {
    return (
      <PostPreview
        content={content ?? ''}
        previews={previews}
        onBack={onTogglePreview}
      />
    )
  }

  return (
    <form onSubmit={onSubmit}>
      <Card>
        <div className="flex flex-col">
          <div className="flex flex-col gap-4 sm:flex-row">
            {isUserLoading ? (
              <Skeleton className="size-12 shrink-0 rounded-full max-lg:hidden" />
            ) : (
              <Link
                to={paths.user.byId(String(user?.id))}
                className="h-fit max-lg:hidden"
              >
                <UserAvatar
                  user={user}
                  size={48}
                  className="size-12"
                  isLoading={isUserLoading}
                />
              </Link>
            )}

            <Field className="flex w-full flex-col gap-2">
              <Controller
                name="content"
                control={control}
                render={({ field }) => (
                  <TipTapEditor
                    editorBeforeChildren={
                      isTablet && (
                        <Link
                          to={paths.user.byId(String(user?.id))}
                          className="h-fit"
                        >
                          <UserAvatar
                            user={user}
                            size={48}
                            className="size-12"
                            isLoading={isUserLoading}
                          />
                        </Link>
                      )
                    }
                    placeholder={t('shareYourThoughts')}
                    {...field}
                  />
                )}
              />
              <FieldError>{errors.content?.message}</FieldError>
            </Field>
          </div>

          <ImagePreview
            srcs={previews}
            className="size-30"
            maxImages={3}
            showDeleteIcon
            isPending={isPending}
            onDeleteImage={onDeleteImage}
            containerClassName={cn(
              'grid gap-3 mt-5',
              previews.length === 2 && 'grid-cols-2',
              previews.length >= 3 && 'grid-cols-3'
            )}
          />

          <PostFormActions
            onChange={onChange}
            isPending={isPending}
            isEditing={isEditing}
            onTogglePreview={onTogglePreview}
            onCancelEdit={onCancelEdit}
          />
        </div>
      </Card>
    </form>
  )
}
