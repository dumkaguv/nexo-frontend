import { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Image, Video } from "lucide-react";
import { Card } from "@/components/shared";
import * as Person from "@/components/shared/Person";
import { Button } from "@/components/ui";
import { Routes } from "@/config";
import { useAuthStore } from "@/stores";

export const FormCreatePost = () => {
  const { profile, isPendingProfile } = useAuthStore();

  const { t } = useTranslation();

  const actionButtons = () => [
    {
      icon: <Image className="text-green-500" />,
      text: <span className="opacity-70">Photo</span>
    }
  ]

  return (
    <Card>
      <div className="flex flex-col">
        <div className="flex gap-4">
          <Link to={Routes.profile}>
            <Person.Avatar
              src={profile?.avatarUrl}
              isLoading={isPendingProfile}
              className="size-12"
            />
          </Link>

          <div className="flex w-full flex-col gap-2">
            <textarea
              className="h-auto w-full resize-none overflow-hidden pt-3 outline-0"
              id="postCreateTextarea"
              placeholder={t("shareYourThoughts")}
              onInput={(e: FormEvent<HTMLTextAreaElement>) => {
                const target = e.currentTarget;
                target.style.height = "auto";
                target.style.height = `${target.scrollHeight}px`;
              }}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <div className="pt-5">
            <Button
              variant="text"
              className="bg-muted-foreground/15 hover:bg-muted-foreground/25 gap-1 rounded-lg p-3"
            >
              
              
            </Button>
          </div>

          <div className="pt-5">
            <Button
              variant="text"
              className="bg-muted-foreground/15 hover:bg-muted-foreground/25 gap-1 rounded-lg p-3"
            >
              <Video className="text-primary" />
              <span className="opacity-70">Video</span>
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
