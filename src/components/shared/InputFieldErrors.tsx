import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"p"> & {
  message?: string;
};

export const InputFieldErrors = ({ message }: Props) => {
  return <>{Boolean(message) && <p className="text-red-500">{message}</p>}</>;
};
