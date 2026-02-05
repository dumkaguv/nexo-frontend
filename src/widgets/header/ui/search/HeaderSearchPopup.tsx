import { Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { InputSearch, Typography } from '@/shared/ui'

import { Button } from '@/shared/ui/shadcn'

import { UserSearchPopover } from './UserSearchPopover'

type Props = {
  className?: string
}

export const HeaderSearchPopup = ({ className }: Props) => {
  const { t } = useTranslation()

  return (
    <UserSearchPopover
      openOnSearch={false}
      allowOpenWhenEmpty
      renderTrigger={({ setOpen }) => (
        <Button
          variant="link"
          size="icon"
          onClick={() => setOpen(true)}
          aria-label={t('usersSearch')}
          className={className}
        >
          <Search className="h-[1.2rem] w-[1.2rem]" />
          <Typography.Text className="sr-only">
            {t('usersSearch')}
          </Typography.Text>
        </Button>
      )}
      renderContentHeader={({ searchValue, onValueChange, t }) => (
        <div className="relative w-fit p-2">
          <InputSearch
            value={searchValue}
            onChange={(e) => onValueChange(e.target.value)}
            placeholder={t('usersSearch') + '...'}
          />
        </div>
      )}
    />
  )
}
