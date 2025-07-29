import { ComponentProps } from "react";
import { Link } from "react-router-dom";
import { MessageSquareText, Newspaper } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/shared";
import { Button, Separator } from "@/components/ui";
import * as PersonInfo from "@/components/shared/Person";
import { Routes } from "@/config";
import { useAuthStore } from "@/stores";

type Props = ComponentProps<"aside">;

export const Sidebar = ({ className, ...rest }: Props) => {
  const { profile, user, isPendingProfile, isPendingUser } = useAuthStore();

  const { t } = useTranslation();

  const navItems = [
    { name: t("feed"), href: Routes.home, icon: Newspaper },
    { name: t("messages"), href: Routes.messages, icon: MessageSquareText },
  ];

  console.log(profile?.userName);

  return (
    <aside
      className={className}
      {...rest}
    >
      <Card className="flex flex-col items-center">
        <PersonInfo.Avatar
          src={profile?.avatarUrl}
          isLoading={isPendingProfile}
          className="h-18 w-18"
        />

        <PersonInfo.Name name={profile?.fullName} />
        <PersonInfo.Nickname nickname={profile?.userName} />

        <PersonInfo.FollowInfo
          followersCount={user?.followers?.length}
          followingCount={user?.following?.length}
          isLoading={isPendingUser}
          className="mt-4"
        />

        <Separator className="my-4" />

        <ul className="flex w-full flex-col items-start">
          {navItems.map(({ name, href, icon: Icon }) => (
            <li key={name}>
              <nav>
                <Button
                  className="hover:text-primary flex h-fit items-center text-base text-black hover:no-underline"
                  variant="link"
                  asChild
                >
                  <Link to={href}>
                    <Icon className="text-primary" />
                    <p className="text-foreground hover:text-foreground/85 transition-colors duration-200">
                      {name}
                    </p>
                  </Link>
                </Button>
              </nav>
            </li>
          ))}
        </ul>
      </Card>
    </aside>
  );
};
