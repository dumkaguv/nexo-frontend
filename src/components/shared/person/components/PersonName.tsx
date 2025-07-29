import { ComponentProps } from "react";
import { cn } from "@/utils";
import { Skeleton } from "@/components/ui";

type Props = ComponentProps<"h2"> & {
  name?: string;
};

export const PersonName = ({ name, className, ...rest }: Props) => {
  return (
    <h2
      className={cn("text-xl font-bold", className)}
      {...rest}
    >
      {name ? name : <Skeleton className="mt-1.5 h-6 w-36" />}
    </h2>
  );
};
