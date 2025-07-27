import { LogOut, MessageSquareText, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Avatar,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  Skeleton,
} from "@/components/ui";
import { LocalStorage, Routes } from "@/config";
import { Api } from "@/services/apiClient";
import { handleMutationError } from "@/utils";
import { useAuthStore } from "@/stores";

export const HeaderAvatar = () => {
  const { user, setUser, isPending } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync: logout } = useMutation({
    mutationFn: Api.auth.logout,
    onSuccess: ({ message }) => {
      toast.success(message ?? "Logout successfully");
      localStorage.removeItem(LocalStorage.token);
      setUser(null);
      navigate(Routes.login);
    },
    onError: (error) => handleMutationError(error),
  });

  const onButtonLogoutClick = async () => await logout();

  const menuItems = [
    {
      icon: <MessageSquareText />,
      label: "Messages",
      to: Routes.messages,
    },
    {
      icon: <Settings />,
      label: "Settings",
      to: Routes.settings,
    },
    {
      icon: <LogOut />,
      label: "Logout",
      onClick: onButtonLogoutClick,
    },
  ];

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {isPending ? (
          <Skeleton className="h-10 w-10 rounded-full" />
        ) : (
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src="/public/images/avatar.avif" />
          </Avatar>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        alignOffset={-8}
      >
        {menuItems.map((item, index) => (
          <DropdownMenuItem
            key={index}
            className="p-0"
          >
            {"to" in item ? (
              <Button
                asChild
                variant="text"
                className="w-full justify-start"
              >
                <Link to={item.to ?? Routes.home}>
                  {item.icon}
                  {item.label}
                </Link>
              </Button>
            ) : (
              <Button
                onClick={item.onClick}
                variant="text"
                className="w-full justify-start"
              >
                {item.icon}
                {item.label}
              </Button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
