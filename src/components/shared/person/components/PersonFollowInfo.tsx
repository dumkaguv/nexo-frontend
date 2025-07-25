import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils";
import { Separator } from "@/components/ui";

type Props = ComponentPropsWithoutRef<"div"> & {
  followersCount?: number;
  followingCount?: number;
};

export const PersonFollowInfo = ({
  followersCount,
  followingCount,
  className,
  ...rest
}: Props) => {
  return (
    <div
      className={cn("flex h-12 gap-4", className)}
      {...rest}
    >
      <div className="flex flex-col items-center">
        <span className="font-bold">{followersCount ?? 0}</span>
        <p className="text-muted-foreground">Followers</p>
      </div>

      <Separator
        className="h-10 w-10"
        orientation="vertical"
      />

      <div className="flex flex-col items-center">
        <span className="font-bold">{followingCount ?? 0}</span>
        <p className="text-muted-foreground">Following</p>
      </div>
    </div>
  );
};
