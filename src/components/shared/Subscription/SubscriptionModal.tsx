import { useState } from 'react'
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

import { useDebouncedValue } from '@/hooks'
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

  const [searchValue, setSearchValue] = useState('')
  const debouncedSearchValue = useDebouncedValue(searchValue)

  const { t } = useTranslation()

  const onChangeTab = () => setSearchValue('')

  return (
    <Dialog open={open} onOpenChange={onOpenChange} {...props}>
      <DialogContent aria-describedby={undefined}>
        <Tabs
          defaultValue={isFollowersTab ? 'followers' : 'following'}
          onValueChange={onChangeTab}
        >
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

              <InputSearch
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                inputClassName="h-10"
              />
            </div>
          </DialogHeader>

          <TabsContent value="followers" className="mt-4">
            <SubscriptionList
              searchValue={debouncedSearchValue}
              isFollowersTab
            />
          </TabsContent>

          <TabsContent value="following" className="mt-4">
            <SubscriptionList
              searchValue={debouncedSearchValue}
              isFollowersTab={false}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
