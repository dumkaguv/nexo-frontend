import { Check, Globe } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import { i18n } from '@/shared/config'
import { Typography } from '@/shared/ui'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/shared/ui/shadcn'

import type { ReactNode } from 'react'

export const LanguageSwitcher = () => {
  const { i18n: i18nInstance, t } = useTranslation()
  const currentLang = i18nInstance.language.split('-')[0]

  const languages = [
    { code: 'en', label: t('en') },
    { code: 'ru', label: t('ru') }
  ]

  const onLanguageChange = (code: string) => i18n.changeLanguage(code)

  const renderMenuItem = (value: string, label: string, icon: ReactNode) => (
    <DropdownMenuItem key={value} onClick={() => onLanguageChange(value)}>
      {icon}
      <Typography.Text className="text-sm">{label}</Typography.Text>
      <Typography.Text className="ml-auto">
        {currentLang === value && <Check size={16} />}
      </Typography.Text>
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon" className="hover:bg-primary/25">
              <Globe className="h-[1.2rem] w-[1.2rem]" />
              <Typography.Text className="sr-only">
                {t('changeLanguage')}
              </Typography.Text>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('changeLanguage')}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {languages.map(({ code, label }) =>
          renderMenuItem(code, label, <Globe size={16} />)
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
