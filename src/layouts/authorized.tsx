import { Outlet } from "react-router-dom";
import { Header, Container, ProtectedRoute } from "@/components/shared";

export const AuthorizedLayout = () => {
  return (
    <ProtectedRoute>
      <Container>
        <Header className="mb-6" />

        <Outlet />
      </Container>
    </ProtectedRoute>
  );
};
