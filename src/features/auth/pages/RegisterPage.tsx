import { Link } from "react-router-dom";
import { Routes } from "@/config";
import { RegisterForm } from "@/features/auth/components";

export const RegisterPage = () => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border-[1px] bg-white p-8 text-center shadow-sm">
      <h1 className="mb-2 text-4xl font-bold">Sign in</h1>
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
    </div>
  );
};
