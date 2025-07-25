import { Outlet } from "react-router-dom";
import { Container } from "@/components/shared";

export const LoginLayout = () => {
  return (
    <Container className="flex h-screen flex-col items-center justify-center">
      <Outlet />
    </Container>
  );
};
