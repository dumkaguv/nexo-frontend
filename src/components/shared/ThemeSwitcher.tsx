import { Check, Laptop, Moon, Sun } from 'lucide-react'

import { useTranslation } from 'react-i18next'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui'
import { useThemeStore } from '@/stores'

import type { ReactNode } from 'react'

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore()

  const { t } = useTranslation()

  const onThemeChange = (value: typeof theme) => setTheme(value)

  const renderMenuItem = (
    value: typeof theme,
    label: string,
    icon: ReactNode
  ) => (
    <DropdownMenuItem onClick={() => onThemeChange(value)}>
      {icon}
      <span>{label}</span>
      <span className="ml-auto">{theme === value && <Check size={16} />}</span>
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button variant="link" size="icon" className="hover:bg-primary/25">
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">{t('theme.toggleTheme')}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t('theme.toggleTheme')}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent
        align="end"
        onCloseAutoFocus={(e) => e.preventDefault()}
      >
        {renderMenuItem('light', t('theme.light'), <Sun size={16} />)}
        {renderMenuItem('dark', t('theme.dark'), <Moon size={16} />)}
        {renderMenuItem('system', t('theme.system'), <Laptop size={16} />)}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
