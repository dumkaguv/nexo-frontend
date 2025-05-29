import { FC } from "react";
import { cn } from "@/lib";

interface Props {
  name: string;
  className?: string;
}

export const PersonName: FC<Props> = ({ name, className }) => {
  return <h2 className={cn("text-xl font-bold", className)}>{name}</h2>;
};
