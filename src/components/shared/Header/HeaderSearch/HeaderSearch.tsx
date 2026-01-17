import { useInfiniteQuery } from '@tanstack/react-query'
import { BookMinus } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'

import { userControllerFindAllInfiniteOptions } from '@/api'
import {
  AvatarWithColorInitials,
  InputSearch,
  Typography
} from '@/components/shared'
import * as Person from '@/components/shared/Person'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  Popover,
  PopoverAnchor,
  PopoverContent,
  Spinner
} from '@/components/ui'
import { paths } from '@/config'
import { useDebouncedValue } from '@/hooks'
import { useQueryUpdate } from '@/hooks/useQueryUpdate'

export const HeaderSearch = () => {
  const { updateQuery, params } = useQueryUpdate()

  const [isOpenPopover, setIsOpenPopover] = useState(false)
  const [searchValue, setSearchValue] = useState<string>(
    typeof params.search === 'string' ? params.search : ''
  )
  const debouncedSearch = useDebouncedValue(searchValue)

  const { t } = useTranslation()

  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery({
    ...userControllerFindAllInfiniteOptions({
      query: { search: debouncedSearch }
    }),
    getNextPageParam: ({ nextPage }) => nextPage,
    enabled: !!debouncedSearch
  })

  const allUsers = data?.pages.flatMap((page) => page?.data ?? [])
  const total = data?.pages[0]?.total ?? 0

  useEffect(() => {
    if (searchValue && data) {
      setIsOpenPopover(true)
    } else {
      setIsOpenPopover(false)
    }
  }, [searchValue, data])

  const onValueChange = (value: string) => {
    setSearchValue(value)
    updateQuery({ search: value })
  }

  const onOpenChange = (open: boolean) => {
    if (open && !searchValue) {
      return
    }

    setIsOpenPopover(open)
  }

  const renderLoadingState = () => (
    <div className="flex items-center gap-2 px-2">
      <Spinner className="size-3" />{' '}
      <Typography.Text className="text-muted-foreground text-sm">
        {t('loading')}
      </Typography.Text>
    </div>
  )

  return (
    <Popover open={isOpenPopover} onOpenChange={onOpenChange} modal={false}>
      <PopoverAnchor asChild>
        <div className="relative">
          <InputSearch
            value={searchValue}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={t('usersSearch') + '...'}
            className="w-full sm:w-75"
          />

          {isLoading && (
            <div className="absolute top-1/2 right-11 -translate-y-1/2">
              {renderLoadingState()}
            </div>
          )}
        </div>
      </PopoverAnchor>

      <PopoverContent
        className="w-[calc(100vw-2rem)] overflow-y-hidden p-0 sm:w-75"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Command className="bg-input/50">
          {total === 0 && !isLoading && (
            <CommandEmpty>
              <Empty className="p-2 md:p-4">
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BookMinus />
                  </EmptyMedia>

                  <EmptyTitle>{t('noResultsFound')}</EmptyTitle>
                  <EmptyDescription>
                    {t('tryToTypeAnythingElse')}
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            </CommandEmpty>
          )}

          {allUsers?.length > 0 && (
            <CommandList className="overflow-y-hidden">
              <div
                id="users-scrollable-list"
                className="max-h-75 overflow-y-auto"
              >
                <InfiniteScroll
                  dataLength={allUsers?.length ?? 0}
                  next={fetchNextPage}
                  hasMore={!!hasNextPage}
                  loader={renderLoadingState()}
                  scrollableTarget="users-scrollable-list"
                  scrollThreshold={0.9}
                >
                  <CommandGroup>
                    {allUsers.map((user) => (
                      <Link
                        key={user.id}
                        to={paths.user.byId(user.id)}
                        onClick={() => setIsOpenPopover(false)}
                      >
                        <CommandItem className="cursor-pointer">
                          <div className="flex items-center gap-2.5">
                            <AvatarWithColorInitials user={user} />
                            <div className="flex flex-col items-start">
                              <Person.Name
                                name={user.profile.fullName}
                                className="text-sm"
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
