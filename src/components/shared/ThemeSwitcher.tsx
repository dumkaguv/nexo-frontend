import { useState } from "react";
import { Check, Moon, Sun, Laptop } from "lucide-react";
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
import { useThemeStore } from "@/stores";

export const ThemeSwitcher = () => {
  const { theme, setTheme } = useThemeStore();
  const [tooltipEnabled, setTooltipEnabled] = useState(true);

  const handleThemeChange = (value: typeof theme) => {
    setTheme(value);
    setTooltipEnabled(false);
    setTimeout(() => {
      setTooltipEnabled(true);
    }, 400);
  };

  const renderMenuItem = (
    value: typeof theme,
    label: string,
    icon: React.ReactNode
  ) => (
    <DropdownMenuItem onClick={() => handleThemeChange(value)}>
      {icon}
      <span>{label}</span>
      <span className="ml-auto">{theme === value && <Check size={16} />}</span>
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
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Switch theme</TooltipContent>
      </Tooltip>

      <DropdownMenuContent align="end">
        {renderMenuItem("light", "Light", <Sun size={16} />)}
        {renderMenuItem("dark", "Dark", <Moon size={16} />)}
        {renderMenuItem("system", "System", <Laptop size={16} />)}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
