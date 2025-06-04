import { ROUTES } from "@/constants/routes";
import { AuthorizedLayout, LoginLayout } from "@/layouts";
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const HomePage = lazy(() => import("@/pages/home"));
const LoginPage = lazy(() => import("@/pages/login"));
const RegisterPage = lazy(() => import("@/pages/register"));

export const AppRouter = () => {
  return (
    <Router>
      <Suspense>
        <Routes>
          <Route element={<AuthorizedLayout />}>
            <Route
              path={ROUTES.HOME}
              element={<HomePage />}
            />
          </Route>

          <Route element={<LoginLayout />}>
            <Route
              path={ROUTES.LOGIN}
              element={<LoginPage />}
            />
            <Route
              path={ROUTES.REGISTER}
              element={<RegisterPage />}
            />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};
