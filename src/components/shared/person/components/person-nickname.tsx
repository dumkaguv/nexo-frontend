import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils";

interface Props {
  nickname?: string;
  className?: string;
}

export const PersonNickname: FC<PropsWithChildren<Props>> = ({
  children,
  nickname,
  className,
}) => {
  if (children && nickname) {
    throw new Error("nickname and children cannot be used together");
  }

  return <p className={cn("", className)}>{children ?? nickname}</p>;
};
