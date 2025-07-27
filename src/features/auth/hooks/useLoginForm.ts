import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { LoginPayload } from "@/services/auth";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "@/features/auth/zodSchemas";
import { LocalStorage, Routes } from "@/config";
import type { ApiResponse } from "@/types";
import type { InputField } from "@/features/auth/types";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const navigate = useNavigate();

  const { mutateAsync: loginMutate, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => Api.auth.login(payload),
    onSuccess: (response) => {
      toast.success(response.message ?? "Login successfully!");
      localStorage.setItem(
        LocalStorage.token,
        response.data?.accessToken ?? ""
      );
      navigate(Routes.home);
    },
    onError: (error) => {
      const axiosError = error as AxiosError<ApiResponse>;
      toast.error(
        axiosError.response?.data.message ?? "Login error! Please try again."
      );

      console.log(error);
    },
  });

  const onSubmit = async (data: LoginPayload) => await loginMutate(data);

  const inputFields: InputField<LoginFormSchema>[] = [
    {
      name: "email",
      label: "Email",
      type: "text",
      placeholder: "alex-johnson@gmail.com",
      id: "email",
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "sHa$#as34Kh^",
      id: "password",
    },
  ];

  return {
    isPending,
    onSubmit,
    loginMutate,
    register,
    handleSubmit,
    errors,
    inputFields,
  };
};
