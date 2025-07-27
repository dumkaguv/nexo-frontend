import { Routes } from "@/config";
import { getAccessToken } from "@/utils";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const isAuth = getAccessToken();

  if (!isAuth) {
    return <Navigate to={Routes.login} />;
  }

  return children;
};
