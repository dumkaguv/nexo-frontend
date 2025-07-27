import { Link } from "react-router-dom";
import { MessageSquareText, Settings } from "lucide-react";
import { Button } from "@/components/ui";
import { Routes } from "@/config";

const navItems = [
  { name: "Messages", href: Routes.messages, icon: MessageSquareText },
  { name: "Settings", href: Routes.settings, icon: Settings },
];

export const HeaderButtons = () => {
  return (
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
  );
};
