import { FC, PropsWithChildren } from "react";
import { cn } from "@/utils";

interface Props {
  className?: string;
}

export const Container: FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("mx-auto max-w-[1280px]", className)}>{children}</div>
  );
};
