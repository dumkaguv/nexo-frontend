import { Button, Input } from "@/components/ui";
import { ROUTES } from "@/constants/routes";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="rounded-lg border-[1px] bg-white p-8 text-center shadow-sm">
      <h1 className="mb-2 text-4xl font-bold">Sign in</h1>
      <p>
        Don't have an account?{" "}
        <Link
          to={ROUTES.REGISTER}
          className="text-primary underline-offset-3 hover:underline"
        >
          Click here to sign up
        </Link>
      </p>

      <form className="mt-5 text-start">
        <label htmlFor="email">Email</label>
        <Input
          className="mt-1 mb-5 px-3 py-6"
          placeholder="alex-johnson@gmail.com"
          id="email"
        />

        <label htmlFor="password">Password</label>
        <Input
          className="mt-1 mb-5 px-3 py-6"
          placeholder="sHa$#as34Kh^"
          id="password"
          type="password"
        />

        <label htmlFor="confirm-password">Confirm password</label>
        <Input
          className="mt-1 px-3 py-6"
          placeholder="sHa$#as34Kh^"
          id="confirm-password"
          type="password"
        />

        <Button
          className="mt-8 h-12 w-full text-lg"
          type="submit"
        >
          Sign me up
        </Button>
      </form>
    </div>
  );
}
