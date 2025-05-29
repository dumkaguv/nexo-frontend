import { FC } from "react";
import { cn } from "@/lib";
import { Link } from "react-router-dom";
import { LoaderPinwheel, MessageSquareText, Settings } from "lucide-react";

import { ROUTES } from "@/constants";
import { InputSearch } from "@/components/shared";
import {
  Avatar,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";

interface Props {
  className?: string;
}

const navItems = [
  { name: "Messages", href: ROUTES.MESSAGES, icon: MessageSquareText },
  { name: "Settings", href: ROUTES.SETTINGS, icon: Settings },
];

export const Header: FC<Props> = ({ className }) => {
  return (
    <header
      className={cn(
        "sticky top-0 flex items-center justify-between gap-5 rounded-b-md bg-white p-2 shadow-md",
        className,
      )}
    >
      <div className="flex items-center gap-5">
        <Link
          to={ROUTES.HOME}
          className="hover:text-primary flex items-center gap-1"
        >
          <LoaderPinwheel size={36} className="text-primary" />
          <h1 className="text-xl font-bold">Nexo</h1>
        </Link>

        <InputSearch className="w-[400px]" />
      </div>

      <div className="flex items-center gap-3">
        <ul className="flex items-center gap-2">
          {navItems.map((item) => (
            <li key={item.name}>
              <nav>
                <Button
                  asChild
                  variant="link"
                  className="bg-custom-gray hover:bg-primary/25 h-10 w-10"
                >
                  <Link to={item.href}>
                    <item.icon size={16} />
                  </Link>
                </Button>
              </nav>
            </li>
          ))}
        </ul>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar className="h-10 w-10 cursor-pointer">
              <AvatarImage src="/public/images/avatar.avif" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side="bottom" alignOffset={-9}>
            <DropdownMenuItem>Check</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
