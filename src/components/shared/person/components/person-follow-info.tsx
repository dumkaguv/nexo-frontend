import { FC } from "react";
import { cn } from "@/utils";
import { Separator } from "@/components/ui";

interface Props {
  followersCount?: number;
  followingCount?: number;
  className?: string;
}

export const PersonFollowInfo: FC<Props> = ({
  followersCount,
  followingCount,
  className,
}) => {
  return (
    <div className={cn("flex h-12 gap-4", className)}>
      <div className="flex flex-col items-center">
        <span className="font-bold">{followersCount ?? 0}</span>
        <p className="text-muted-foreground">Followers</p>
      </div>

      <Separator className="h-10 w-10" orientation="vertical" />

      <div className="flex flex-col items-center">
        <span className="font-bold">{followingCount ?? 0}</span>
        <p className="text-muted-foreground">Following</p>
      </div>
    </div>
  );
};
