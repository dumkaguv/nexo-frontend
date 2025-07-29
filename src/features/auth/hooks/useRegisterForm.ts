import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { RegistrationPayload } from "@/services/auth";
import {
  createRegisterFormSchema,
  type RegisterFormSchema,
} from "@/features/auth/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Routes } from "@/config";
import type { InputField } from "@/features/auth/types";
import {
  handleMutationError,
  saveAccessToken,
  getUserFromAuthResponse,
} from "@/utils";
import { useAuthStore } from "@/stores";

export const useRegisterForm = () => {
  const { t } = useTranslation();

  const schema = createRegisterFormSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(schema),
  });
  const { setUser } = useAuthStore();

  const navigate = useNavigate();

  const { mutateAsync: registerMutate, isPending } = useMutation({
    mutationFn: (payload: RegistrationPayload) => Api.auth.register(payload),
    onSuccess: ({ data, message }) => {
      if (data) {
        toast.success(message ?? t("auth.registerSuccess"));
        saveAccessToken(data.tokens.accessToken);
        setUser(getUserFromAuthResponse(data));
        navigate(`${Routes.activate}/${data.user.userId}`);
      } else {
        toast.error(t("auth.registerError"));
      }
    },
    onError: (error) => handleMutationError(error),
  });

  const onSubmit = async (data: RegisterFormSchema) =>
    await registerMutate(data);

  const inputFields: InputField<RegisterFormSchema>[] = [
    {
      name: "email",
      label: t("auth.email"),
      type: "text",
      placeholder: "alex-johnson@gmail.com",
      id: "email",
      autoComplete: "email",
    },
    {
      name: "userName",
      label: t("auth.username"),
      type: "text",
      placeholder: "alex_j",
      id: "username",
      autoComplete: "username",
    },
    {
      name: "fullName",
      label: t("auth.fullName"),
      type: "text",
      placeholder: "Alex Johnson",
      id: "full-name",
      autoComplete: "name",
    },
    {
      name: "password",
      label: t("auth.password"),
      type: "password",
      placeholder: "sHa$#as34Kh^",
      id: "password",
      autoComplete: "new-password",
    },
    {
      name: "confirmPassword",
      label: t("auth.confirmPassword"),
      type: "password",
      placeholder: "sHa$#as34Kh^",
      id: "confirm-password",
      autoComplete: "new-password",
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
