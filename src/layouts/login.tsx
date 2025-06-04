import { FC } from "react";
import { Container } from "@/components/shared";
import { Outlet } from "react-router-dom";

export const LoginLayout: FC = () => {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <Outlet />
    </Container>
  );
};
