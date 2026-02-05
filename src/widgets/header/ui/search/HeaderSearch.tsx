import { useTranslation } from 'react-i18next'

import { InputSearch } from '@/shared/ui'

import { HeaderSearchLoading } from './HeaderSearchLoading'
import { UserSearchPopover } from './UserSearchPopover'

export const HeaderSearch = () => {
  const { t } = useTranslation()

  return (
    <UserSearchPopover
      openOnSearch
      allowOpenWhenEmpty={false}
      renderTrigger={({ isLoading, searchValue, onValueChange }) => (
        <div className="relative">
          <InputSearch
            value={searchValue}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={t('usersSearch') + '...'}
            className="w-full"
          />

          {isLoading && (
            <div className="absolute top-1/2 right-11 -translate-y-1/2">
              <HeaderSearchLoading />
            </div>
          )}
        </div>
      )}
    />
  )
}
