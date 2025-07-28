import { Outlet } from "react-router-dom";
import { Header, Container } from "@/components/shared";
import { ProtectedRoute } from "@/features/auth";

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
