import { useTranslation } from 'react-i18next'

import { InputSearch } from '@/components/shared'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui'

import { useAuthStore } from '@/stores'

import { SubscriptionList } from './SubscriptionList'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  isFollowersTab?: boolean
} & DialogProps

export const SubscriptionModal = ({
  isFollowersTab = true,
  open,
  onOpenChange,
  ...props
}: Props) => {
  const { user } = useAuthStore()

  const { t } = useTranslation()

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent
        className="max-h-11/12 overflow-y-hidden"
        aria-describedby={undefined}
      >
        <Tabs defaultValue={isFollowersTab ? 'followers' : 'following'}>
          <DialogHeader className="space-y-4">
            <DialogTitle hidden={true} />
            <div className="flex flex-col gap-3">
              <TabsList className="mt-4 grid w-full grid-cols-2">
                <TabsTrigger value="followers">
                  {t('followers')} {user?.followersCount}
                </TabsTrigger>
                <TabsTrigger value="following">
                  {t('following')} {user?.followingCount}
                </TabsTrigger>
              </TabsList>

              <InputSearch inputClassName="h-10" />
            </div>
          </DialogHeader>

          <TabsContent
            value="followers"
            className="mt-4 max-h-[370px] overflow-y-auto"
          >
            <SubscriptionList isFollowersTab />
          </TabsContent>

          <TabsContent
            value="following"
            className="mt-4 max-h-[370px] overflow-y-auto"
          >
            <SubscriptionList isFollowersTab={false} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
