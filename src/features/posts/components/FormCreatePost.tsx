import { useMutation } from '@tanstack/react-query'
import { Image, Video } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { toast } from 'sonner'

import { Card, TextAreaAutoHeight } from '@/components/shared'
import * as Person from '@/components/shared/Person'
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import { Routes } from '@/config'
import { Api } from '@/services/apiClient'
import { useAuthStore } from '@/stores'

import { handleMutationError } from '@/utils'

import type { CreatePostPayload } from '@/services/posts'

export const FormCreatePost = () => {
  const { profile, isPendingProfile } = useAuthStore()

  const { t } = useTranslation()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (payload: CreatePostPayload) => Api.posts.createPost(payload),
    onSuccess: ({ message }) => toast.success(message),
    onError: (e) => handleMutationError(e)
  })

  const actionButtons = [
    {
      icon: <Image className="text-green-500" />,
      label: t('photo')
    },
    {
      icon: <Video className="text-primary" />,
      label: t('video')
    }
  ]

  return (
    <form>
      <Card>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Link to={Routes.profile}>
              <Person.Avatar
                src={profile?.avatarUrl}
                isLoading={isPendingProfile}
                className="size-12"
              />
            </Link>

            <div className="flex w-full flex-col gap-2">
              <TextAreaAutoHeight />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 pt-5">
            <div className="flex items-center gap-3">
              {actionButtons.map(({ icon, label }, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="text"
                      className="bg-muted-foreground/15 hover:bg-muted-foreground/25 gap-1 rounded-lg p-3"
                    >
                      {icon}
                      <span className="opacity-70">{label}</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t('attach')} {label.toLowerCase()}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>

            <Button loading={isPending}>
              {t('publish')} {t('post').toLowerCase()}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  )
}
