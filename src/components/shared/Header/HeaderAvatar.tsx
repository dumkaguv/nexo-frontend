import { LogOut, MessageSquareText, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui";
import { LocalStorage, Routes } from "@/config";
import { Api } from "@/services/apiClient";
import { handleMutationError } from "@/utils";
import { useAuthStore } from "@/stores";
import * as PersonInfo from "@/components/shared/Person";

export const HeaderAvatar = () => {
  const { profile, setProfile, setUser, isPendingProfile } = useAuthStore();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { mutateAsync: logout } = useMutation({
    mutationFn: Api.auth.logout,
    onSuccess: ({ message }) => {
      toast.success(message ?? t("auth.logoutSuccess"));
      localStorage.removeItem(LocalStorage.token);
      setProfile(null);
      setUser(null);
      navigate(Routes.login);
    },
    onError: (error) => handleMutationError(error),
  });

  const onButtonLogoutClick = async () => await logout();

  const menuItems = [
    {
      icon: <MessageSquareText className="text-primary" />,
      label: t("messages"),
      to: Routes.messages,
    },
    {
      icon: <Settings className="text-primary" />,
      label: t("settings"),
      to: Routes.settings,
    },
    {
      icon: <LogOut className="text-primary" />,
      label: t("auth.logout"),
      onClick: onButtonLogoutClick,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <PersonInfo.Avatar
          src={profile?.avatarUrl}
          isLoading={isPendingProfile}
          className="h-10 w-10 cursor-pointer"
        />
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
