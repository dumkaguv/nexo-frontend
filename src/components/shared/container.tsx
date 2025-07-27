import { ComponentProps } from "react";
import { cn } from "@/utils";

type Props = ComponentProps<"div">;

export const Container = ({ children, className, ...rest }: Props) => {
  return (
    <div
      className={cn("mx-auto max-w-[1280px]", className)}
      {...rest}
    >
      {children}
    </div>
  );
};
