import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { RegistrationPayload } from "@/services/auth";
import { registerFormSchema, RegisterFormSchema } from "@/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import { LocalStorage, Routes } from "@/config";

export type InputField = {
  name: keyof RegisterFormSchema;
  label: string;
  type: "text" | "password";
  placeholder: string;
  id: string;
};

export const useRegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync: registerMutate, isPending } = useMutation({
    mutationFn: (payload: RegistrationPayload) => Api.auth.register(payload),
    onSuccess: (response) => {
      toast.success(response.message ?? "Register successfully!");
      localStorage.setItem(
        LocalStorage.token,
        response.data?.accessToken ?? ""
      );
      navigate(`${Routes.activate}/${response.data?.userId}`);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "Register error! Please try again."
      );

      console.log(error);
    },
  });

  const onSubmit = async (data: RegisterFormSchema) =>
    await registerMutate(data);

  const inputFields: InputField[] = [
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

  return {
    isPending,
    onSubmit,
    registerMutate,
    register,
    handleSubmit,
    errors,
    inputFields,
  };
};
