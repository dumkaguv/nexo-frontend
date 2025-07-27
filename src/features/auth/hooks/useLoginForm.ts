import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import {
  loginFormSchema,
  type LoginFormSchema,
} from "@/features/auth/zodSchemas";
import { Routes } from "@/config";
import {
  handleMutationError,
  saveAccessToken,
  getUserFromAuthResponse,
} from "@/utils";
import { useAuthStore } from "@/stores";
import type { InputField } from "@/features/auth/types";
import type { LoginPayload } from "@/services/auth";

export const useLoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
  });

  const { setUser } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync: loginMutate, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => Api.auth.login(payload),
    onSuccess: ({ data, message }) => {
      if (data) {
        toast.success(message ?? "Login successfully!");
        saveAccessToken(data.accessToken);
        setUser(getUserFromAuthResponse(data));
        navigate(Routes.home);
      } else {
        toast.error("Error occurred. Please, log in one more time");
      }
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
