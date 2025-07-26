import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Routes } from "@/config";
import { InputFieldErrors, InputPassword } from "@/components/shared";
import { Button, Input, Label } from "@/components/ui";
import { registerFormSchema, type RegisterFormSchema } from "@/zodSchemas";
import { Api } from "@/services/apiClient";
import { RegistrationPayload } from "@/services/auth";
import toast from "react-hot-toast";

export const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const { mutateAsync: registerMutate, isPending } = useMutation({
    mutationFn: (payload: RegistrationPayload) => Api.auth.register(payload),
    onSuccess: (response) => {
      toast.success(response.message ?? "Register successfully!");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Register error! Please try again.");
    },
  });

  const onSubmit = async (data: RegisterFormSchema) => {
    console.log("Submitted data:", data);
    await registerMutate(data);
  };

  const inputFields: {
    name: keyof RegisterFormSchema;
    label: string;
    type: "text" | "password";
    placeholder: string;
    id: string;
  }[] = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "alex-johnson@gmail.com",
      id: "email",
    },
    {
      name: "userName",
      label: "Username",
      type: "text",
      placeholder: "alex_j",
      id: "username",
    },
    {
      name: "fullName",
      label: "Full name",
      type: "text",
      placeholder: "Alex Johnson",
      id: "full-name",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "sHa$#as34Kh^",
      id: "password",
    },
    {
      name: "confirmPassword",
      label: "Confirm password",
      type: "password",
      placeholder: "sHa$#as34Kh^",
      id: "confirm-password",
    },
  ];

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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-3 flex flex-col gap-5 text-start"
      >
        {inputFields.map(({ name, id, label, placeholder, type }) => {
          const inputProps = {
            ...register(name),
            id,
            placeholder,
          };

          return (
            <div
              key={name}
              className="flex flex-col gap-1"
            >
              <Label htmlFor={id}>{label}</Label>
              {type === "password" ? (
                <InputPassword {...inputProps} />
              ) : (
                <Input {...inputProps} />
              )}
              <InputFieldErrors message={errors[name]?.message} />
            </div>
          );
        })}

        <Button
          type="submit"
          loading={isPending}
          className="mt-2 h-12 w-full text-lg"
        >
          Sign me up
        </Button>
      </form>
    </div>
  );
};
