import { ComponentProps } from "react";

type Props = ComponentProps<"p">;

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
