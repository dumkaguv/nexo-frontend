import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { LoginPayload } from "@/services/auth";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "@/features/auth/zodSchemas";
import { Routes } from "@/config";
import type { InputField } from "@/features/auth/types";
import { handleMutationError, saveAccessToken } from "@/utils";

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
      saveAccessToken(response.data?.accessToken ?? "");
      navigate(Routes.home);
    },
    onError: (error) => {
      handleMutationError(error);
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
