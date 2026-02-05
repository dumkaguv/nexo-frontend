import { useInfiniteQuery } from '@tanstack/react-query'

import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

import { UserAvatar, UserFullName } from '@/entities/user'
import { userControllerFindAllInfiniteOptions } from '@/shared/api'
import { paths } from '@/shared/config'
import { useDebouncedValue, useQueryUpdate } from '@/shared/hooks'
import { cn } from '@/shared/lib'
import { Typography } from '@/shared/ui'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Popover,
  PopoverAnchor,
  PopoverContent
} from '@/shared/ui/shadcn'

import { HeaderSearchEmpty } from './HeaderSearchEmpty'
import { HeaderSearchLoading } from './HeaderSearchLoading'

type TriggerRenderArgs = {
  isLoading: boolean
  searchValue: string
  onValueChange: (v: string) => void
  open: boolean
  setOpen: (v: boolean) => void
}

type ContentHeaderRenderArgs = {
  searchValue: string
  onValueChange: (v: string) => void
  t: (key: string) => string
}

type UserSearchPopoverProps = {
  openOnSearch?: boolean
  allowOpenWhenEmpty?: boolean
  renderTrigger: (args: TriggerRenderArgs) => React.ReactNode
  renderContentHeader?: (args: ContentHeaderRenderArgs) => ReactNode
  className?: string
}

export const UserSearchPopover = ({
  openOnSearch = false,
  allowOpenWhenEmpty = false,
  renderTrigger,
  renderContentHeader,
  className
}: UserSearchPopoverProps) => {
  const { updateQuery, params } = useQueryUpdate()
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [searchValue, setSearchValue] = useState<string>(
    typeof params.search === 'string' ? params.search : ''
  )
  const debouncedSearch = useDebouncedValue(searchValue)

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...userControllerFindAllInfiniteOptions({
      query: { search: debouncedSearch }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!debouncedSearch
  })

  const allUsers = useMemo(
    () => data?.pages.flatMap((page) => page?.data ?? []) ?? [],
    [data]
  )
  const total = data?.pages?.[0]?.total ?? 0

  useEffect(() => {
    if (!openOnSearch) {
      return
    }

    setOpen(!!searchValue)
  }, [openOnSearch, searchValue])

  const onValueChange = (value: string) => {
    setSearchValue(value)
    updateQuery({ search: value })
  }

  const onOpenChange = (nextOpen: boolean) => {
    if (nextOpen && !allowOpenWhenEmpty && !searchValue) {
      return
    }

    setOpen(nextOpen)
  }

  return (
    <Popover open={open} onOpenChange={onOpenChange} modal={false}>
      <PopoverAnchor asChild>
        {renderTrigger({
          isLoading,
          searchValue,
          onValueChange,
          open,
          setOpen
        })}
      </PopoverAnchor>

      <PopoverContent
        className={cn('overflow-y-hidden p-0', className)}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {renderContentHeader?.({
          searchValue,
          onValueChange,
          t
        })}
        <Command className="bg-input/50">
          {total === 0 && !isLoading && debouncedSearch && (
            <CommandEmpty>
              <HeaderSearchEmpty />
            </CommandEmpty>
          )}

          {allUsers.length > 0 && (
            <CommandList className="overflow-y-hidden">
              <div
                id="users-scrollable-list"
                className="max-h-75 overflow-y-auto"
              >
                <InfiniteScroll
                  dataLength={allUsers.length}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={<HeaderSearchLoading />}
                  scrollableTarget="users-scrollable-list"
                  scrollThreshold={0.9}
                >
                  <CommandGroup>
                    {allUsers.map((user) => (
                      <Link
                        key={user.id}
                        to={paths.user.byId(user.id)}
                        onClick={() => setOpen(false)}
                      >
                        <CommandItem className="cursor-pointer">
                          <div className="flex items-center gap-2.5">
                            <UserAvatar user={user} />
                            <div className="flex flex-col items-start">
                              <UserFullName
                                name={user.profile.fullName}
                                className="text-sm max-lg:text-sm"
                              />
                              <Typography.Text className="text-muted-foreground text-xs">
                                {user.username}
                              </Typography.Text>
                            </div>
                          </div>
                        </CommandItem>
                      </Link>
                    ))}
                  </CommandGroup>
                </InfiniteScroll>
              </div>
            </CommandList>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  )
}
