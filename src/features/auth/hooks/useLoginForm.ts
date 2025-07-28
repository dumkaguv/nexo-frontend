import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import {
  createLoginFormSchema,
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
import { useNavigate } from "react-router-dom";

export const useLoginForm = () => {
  const { t } = useTranslation();

  const schema = createLoginFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormSchema>({
    resolver: zodResolver(schema),
  });

  const { setUser } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync: loginMutate, isPending } = useMutation({
    mutationFn: (payload: LoginPayload) => Api.auth.login(payload),
    onSuccess: ({ data, message }) => {
      if (data) {
        toast.success(message ?? t("auth.loginSuccess"));
        saveAccessToken(data.accessToken);
        setUser(getUserFromAuthResponse(data));
        navigate(Routes.home);
      } else {
        toast.error(t("auth.loginError"));
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
      label: t("auth.email"),
      type: "text",
      placeholder: "alex-johnson@gmail.com",
      id: "email",
      autoComplete: "email",
    },
    {
      name: "password",
      label: t("auth.password"),
      type: "password",
      placeholder: "sHa$#as34Kh^",
      id: "password",
      autoComplete: "current-password",
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
