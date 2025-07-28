import { useState } from "react";
import { Check, Globe } from "lucide-react";
import { useTranslation } from "react-i18next";
import { i18n } from "@/config";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui";

const languages = [
  { code: "en", label: "English" },
  { code: "ru", label: "Русский" },
];

export const LanguageSwitcher = () => {
  const [tooltipEnabled, setTooltipEnabled] = useState(true);
  const { i18n: i18nInstance } = useTranslation();
  const currentLang = i18nInstance.language.split("-")[0];

  const { t } = useTranslation();

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setTooltipEnabled(false);
    setTimeout(() => {
      setTooltipEnabled(true);
    }, 400);
  };

  const renderMenuItem = (
    value: string,
    label: string,
    icon: React.ReactNode
  ) => (
    <DropdownMenuItem
      key={value}
      onClick={() => handleLanguageChange(value)}
    >
      {icon}
      <span>{label}</span>
      <span className="ml-auto">
        {currentLang === value && <Check size={16} />}
      </span>
    </DropdownMenuItem>
  );

  return (
    <DropdownMenu>
      <Tooltip open={tooltipEnabled ? undefined : false}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="link"
              size="icon"
              className="hover:bg-primary/25"
            >
              <Globe className="h-[1.2rem] w-[1.2rem]" />
              <span className="sr-only">{t("changeLanguage")}</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>{t("changeLanguage")}</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end">
        {languages.map(({ code, label }) =>
          renderMenuItem(code, label, <Globe size={16} />)
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
