import { ComponentProps } from "react";
import { cn } from "@/utils";

type Props = ComponentProps<"h2"> & {
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
