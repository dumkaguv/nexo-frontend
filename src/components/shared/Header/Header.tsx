import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils";
import { HeaderButtons } from "./HeaderButtons";
import { HeaderAvatar } from "./HeaderAvatar";
import { HeaderLogo } from "./HeaderLogo";
import { HeaderSearch } from "./HeaderSearch";

type Props = ComponentPropsWithoutRef<"header">;

export const Header = ({ className, ...rest }: Props) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-10 flex items-center justify-between gap-5 rounded-b-md bg-white p-2 shadow-md",
        className
      )}
      {...rest}
    >
      <div className="flex items-center gap-5">
        <HeaderLogo />
        <HeaderSearch />
      </div>

      <div className="flex items-center gap-3">
        <HeaderButtons />
        <HeaderAvatar />
      </div>
    </header>
  );
};
