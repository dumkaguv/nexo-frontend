import { FC } from "react";
import { cn } from "@/utils";
import { Link } from "react-router-dom";
import { MessageSquareText, Newspaper } from "lucide-react";

import { Card } from "@/components/shared";
import * as PersonInfo from "@/components/shared/person";
import { Avatar, AvatarImage, Button, Separator } from "@/components/ui";

interface Props {
  className?: string;
}

const navItems = [
  { name: "Feed", href: "/", icon: Newspaper },
  { name: "Messages", href: "/messages", icon: MessageSquareText },
];

export const Sidebar: FC<Props> = ({ className }) => {
  return (
    <div className={cn("", className)}>
      <Card className="flex flex-col items-center">
        <Avatar className="h-18 w-18">
          <AvatarImage src="/public/images/avatar.avif" />
        </Avatar>

        <PersonInfo.Name name="Dima" />
        <PersonInfo.Nickname>
          <Button asChild className="h-fit p-0" variant="link">
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
                    <item.icon className="text-primary !h-5 !w-5" />
                    <p>{item.name}</p>
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
