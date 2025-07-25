import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils";

type Props = ComponentPropsWithoutRef<"div">;

export const Card = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        "border-custom-gray rounded-md border-1 bg-white p-5 shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
