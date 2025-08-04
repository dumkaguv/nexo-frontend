import { useState } from "react";
import { LogOut, MessageSquareText, Settings } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import {
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
  const [open, setOpen] = useState(false);

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

  const onLogoutClick = async () => {
    await logout();
    setProfile(null);
    setUser(null);
    setOpen(false);
  };

  const closeMenu = () => setOpen(false);

  const menuItems = [
    {
      icon: <MessageSquareText className="text-primary" />,
      label: t("messages"),
      to: Routes.messages,
    },
    {
      icon: <Settings className="text-primary" />,
      label: t("settings"),
      to: Routes.settings.account,
    },
    {
      icon: <LogOut className="text-primary" />,
      label: t("auth.logout"),
      onClick: onLogoutClick,
    },
  ];

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
    >
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
            asChild
          >
            {"to" in item ? (
              <Link
                to={item.to ?? Routes.home}
                onClick={closeMenu}
              >
                <div className="flex items-center gap-2 px-3 py-2">
                  {item.icon}
                  {item.label}
                </div>
              </Link>
            ) : (
              <button
                onClick={item.onClick}
                className="flex w-full items-center gap-2 px-3 py-2"
              >
                {item.icon}
                {item.label}
              </button>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
