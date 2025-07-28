import { ComponentProps } from "react";
import { cn } from "@/utils";

type Props = ComponentProps<"div">;

export const Card = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn(
        "border-accent rounded-md border-1 bg-card p-5 shadow-sm",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
};
