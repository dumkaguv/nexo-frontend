import { ComponentPropsWithoutRef } from "react";
import { cn } from "@/utils";

type Props = ComponentPropsWithoutRef<"h2"> & {
  name: string;
};

export const PersonName = ({ name, className, ...rest }: Props) => {
  return (
    <h2
      className={cn("text-xl font-bold", className)}
      {...rest}
    >
      {name}
    </h2>
  );
};
