import { Outlet } from "react-router-dom";
import { Header, Container } from "@/components/shared";

export const AuthorizedLayout = () => {
  return (
    <Container>
      <Header className="mb-6" />

      <Outlet />
    </Container>
  );
};
