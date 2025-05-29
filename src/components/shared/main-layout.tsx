import { FC, PropsWithChildren } from "react";
import { Header, Container } from "@/components/shared";

interface Props {
  className?: string;
}

export const MainLayout: FC<PropsWithChildren<Props>> = ({
  children,
  className,
}) => {
  return (
    <Container className={className}>
      <Header className="mb-6" />

      {children}
    </Container>
  );
};
