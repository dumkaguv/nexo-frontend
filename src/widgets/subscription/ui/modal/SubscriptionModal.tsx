import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { useDebouncedValue } from '@/shared/hooks'
import { InputSearch } from '@/shared/ui'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/shared/ui/shadcn'

import { SubscriptionList } from '../list'

import type { ResponseUserDto } from '@/shared/api'

import type { DialogProps } from '@radix-ui/react-dialog'

type Props = {
  user?: ResponseUserDto
  isFollowersTab?: boolean
} & DialogProps

export const SubscriptionModal = ({
  user,
  isFollowersTab = true,
  open,
  onOpenChange,
  ...props
}: Props) => {
  const [searchValue, setSearchValue] = useState<string | undefined>()
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
            <DialogTitle hidden />
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
              onOpenChange={onOpenChange}
              isFollowersTab
              user={user}
            />
          </TabsContent>

          <TabsContent value="following" className="mt-4">
            <SubscriptionList
              searchValue={debouncedSearchValue}
              onOpenChange={onOpenChange}
              isFollowersTab={false}
              user={user}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
