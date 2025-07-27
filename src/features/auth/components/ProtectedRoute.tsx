import { Routes } from "@/config";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useProtectedRoute } from "../hooks";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const isAuth = useProtectedRoute();

  if (!isAuth) {
    return <Navigate to={Routes.login} />;
  }

  return children;
};
