import { FC, HTMLAttributes, PropsWithChildren } from "react";
import { cn } from "@/utils";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<PropsWithChildren<Props>> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "border-custom-gray rounded-md border-1 bg-white p-5 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
};
