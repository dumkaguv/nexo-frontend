import { ComponentProps } from "react";
import { cn } from "@/utils";
import { LanguageSwitcher, ThemeSwitcher } from "@/components/shared";
import { HeaderLogo } from "./HeaderLogo";

type Props = ComponentProps<"header">;

export const HeaderUnAuthorized = ({ className, ...rest }: Props) => {
  return (
    <header
      className={cn(
        "bg-card sticky top-0 z-10 flex h-14 items-center justify-between gap-5 rounded-b-md p-2 shadow-md",
        className
      )}
      {...rest}
    >
      <HeaderLogo />

      <div className="flex items-center gap-3">
        <LanguageSwitcher />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
