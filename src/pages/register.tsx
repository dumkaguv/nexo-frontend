import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Routes } from "@/config";
import { InputPassword } from "@/components/shared";
import { Button, Input, Label } from "@/components/ui";
import { registerFormSchema, type RegisterFormSchema } from "@/zodSchemas";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const onSubmit = (data: RegisterFormSchema) => {
    console.log("Submitted data:", data);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg border-[1px] bg-white p-8 text-center shadow-sm">
      <h1 className="mb-2 text-4xl font-bold">Sign in</h1>
      <p>
        Don't have an account?{" "}
        <Link
          to={Routes.register}
          className="text-primary underline-offset-3 hover:underline"
        >
          Click here to sign up
        </Link>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 flex flex-col gap-5 text-start"
      >
        <div className="flex flex-col gap-1">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            placeholder="alex-johnson@gmail.com"
            className="px-3 py-6"
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="password">Password</Label>
          <InputPassword
            {...register("password")}
            id="password"
            placeholder="sHa$#as34Kh^"
            className="px-3 py-6"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Label htmlFor="confirm-password">Confirm password</Label>
          <InputPassword
            {...register("confirmPassword")}
            id="confirm-password"
            placeholder="sHa$#as34Kh^"
            className="px-3 py-6"
          />
          {errors.confirmPassword && (
            <p className="text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="mt-2 h-12 w-full text-lg"
        >
          Sign me up
        </Button>
      </form>
    </div>
  );
};
