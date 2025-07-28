import { Link } from "react-router-dom";
import { Routes } from "@/config";
import { LoginForm } from "@/features/auth/components";
import { Card } from "@/components/shared";

export const LoginPage = () => {
  return (
    <Card>
      <h1 className="mb-2 text-4xl font-bold">Sign in</h1>
      <p>
        Don't have an account?{" "}
        <Link
          to={Routes.register}
          className="text-primary underline-offset-3 hover:underline"
        >
          Click here to register
        </Link>
      </p>

      <LoginForm />
    </Card>
  );
};
