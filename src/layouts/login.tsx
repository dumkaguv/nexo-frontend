import { Outlet } from "react-router-dom";
import { Container } from "@/components/shared";

export const LoginLayout = () => {
  return (
    <Container className="flex flex-col items-center justify-center py-5">
      <Outlet />
    </Container>
  );
};
