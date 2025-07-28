import { Link } from "react-router-dom";
import { Routes } from "@/config";
import { RegisterForm } from "@/features/auth/components";
import { Card } from "@/components/shared";

export const RegisterPage = () => {
  return (
    <Card>
      <h1 className="mb-2 text-4xl font-bold">Sign up</h1>
      <p>
        Have an account?{" "}
        <Link
          to={Routes.login}
          className="text-primary underline-offset-3 hover:underline"
        >
          Click here to login
        </Link>
      </p>

      <RegisterForm />
    </Card>
  );
};
