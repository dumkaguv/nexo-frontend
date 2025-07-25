import { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"p">;

export const PersonNickname = ({ children, className, ...rest }: Props) => {
  return (
    <p
      className={className}
      {...rest}
    >
      {children}
    </p>
  );
};
