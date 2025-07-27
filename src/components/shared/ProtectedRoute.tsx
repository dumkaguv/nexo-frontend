import { LocalStorage, Routes } from "@/config";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const ProtectedRoute = ({ children }: Props) => {
  const isAuth = localStorage.getItem(LocalStorage.token);

  if (!isAuth) {
    return <Navigate to={Routes.login} />;
  }

  return children;
};
