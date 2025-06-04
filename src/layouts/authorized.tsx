import { FC } from "react";
import { Header, Container } from "@/components/shared";
import { Outlet } from "react-router-dom";

export const AuthorizedLayout: FC = () => {
  return (
    <Container>
      <Header className="mb-6" />

      <Outlet />
    </Container>
  );
};
