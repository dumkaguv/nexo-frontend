import { Image, Video } from 'lucide-react'
import { Controller } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { Card, TextAreaAutoHeight, Typography } from '@/components/shared'
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

const { Text } = Typography

export const FormCreatePost = () => {
  const { control, onSubmit, errors, isPending } = useFormCreatePost()

  const { t } = useTranslation()

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
    <form onSubmit={onSubmit}>
      <Card>
        <div className="flex flex-col">
          <div className="flex gap-4">
            <Link to={paths.profile.root}>
              <Person.Avatar className="size-12" />
            </Link>

            <Field className="flex w-full flex-col gap-2">
              <Controller
                name="content"
                control={control}
                render={({ field }) => <TextAreaAutoHeight {...field} />}
              />
              <FieldError>{errors.content?.message}</FieldError>
            </Field>
          </div>

          <div className="flex items-center justify-between gap-3 pt-5">
            <div className="flex items-center gap-3">
              {actionButtons.map(({ icon, label }, i) => (
                <Tooltip key={i}>
                  <TooltipTrigger asChild>
                    <Button
                      variant="text"
                      className="bg-muted-foreground/15 hover:bg-muted-foreground/25 gap-1 rounded-lg"
                    >
                      {icon}
                      <Text className="text-sm opacity-70">{label}</Text>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    {t('attach')} {label.toLowerCase()}
                  </TooltipContent>
                </Tooltip>
              ))}
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
