import { useTranslation } from "react-i18next";
import { ComponentProps } from "react";
import { cn } from "@/utils";
import { Separator } from "@/components/ui";

type Props = ComponentProps<"div"> & {
  followersCount?: number;
  followingCount?: number;
};

export const PersonFollowInfo = ({
  followersCount,
  followingCount,
  className,
  ...rest
}: Props) => {
  const { t } = useTranslation();

  return (
    <div
      className={cn("flex h-12 gap-4", className)}
      {...rest}
    >
      <div className="flex flex-col items-center">
        <span className="font-bold">{followersCount ?? 0}</span>
        <p className="text-muted-foreground">{t("followers")}</p>
      </div>

      <Separator
        className="h-10 w-10"
        orientation="vertical"
      />

      <div className="flex flex-col items-center">
        <span className="font-bold">{followingCount ?? 0}</span>
        <p className="text-muted-foreground">{t("following")}</p>
      </div>
    </div>
  );
};
