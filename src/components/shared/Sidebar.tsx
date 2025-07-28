import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { MessageSquareText, Newspaper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils";
import { Card } from "@/components/shared";
import { Avatar, AvatarImage, Button, Separator } from "@/components/ui";
import * as PersonInfo from "@/components/shared/Person";
import { Routes } from "@/config";

type Props = ComponentProps<"div">;

export const Sidebar = ({ className, ...rest }: Props) => {
  const { t } = useTranslation();

  const navItems = [
    { name: t("feed"), href: Routes.home, icon: Newspaper },
    { name: t("messages"), href: Routes.messages, icon: MessageSquareText },
  ];

  return (
    <div
      className={cn("", className)}
      {...rest}
    >
      <Card className="flex flex-col items-center">
        <Avatar className="h-18 w-18">
          <AvatarImage src="/public/images/avatar.avif" />
        </Avatar>

        <PersonInfo.Name name="Dima" />
        <PersonInfo.Nickname>
          <Button
            asChild
            className="h-fit p-0"
            variant="link"
          >
            <Link to="">@dima</Link>
          </Button>
        </PersonInfo.Nickname>
        <PersonInfo.FollowInfo className="mt-4" />

        <Separator className="my-4" />
        <ul className="flex w-full flex-col items-start">
          {navItems.map((item) => (
            <li key={item.name}>
              <nav>
                <Button
                  className="hover:text-primary flex h-fit items-center text-base text-black hover:no-underline"
                  variant="link"
                  asChild
                >
                  <Link to={item.href}>
                    <item.icon className="text-primary" />
                    <p className="text-foreground hover:text-foreground/85 transition-colors duration-200">
                      {item.name}
                    </p>
                  </Link>
                </Button>
              </nav>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};
