import { FC, HTMLAttributes } from "react";
import { cn } from "@/utils";

interface Props extends HTMLAttributes<HTMLInputElement> {}

export const InputPassword: FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn("", className)}
      {...props}
    ></div>
  );
};
