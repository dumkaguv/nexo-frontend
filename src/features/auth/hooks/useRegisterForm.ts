import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { RegistrationPayload } from "@/services/auth";
import {
  registerFormSchema,
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });
  const { setUser } = useAuthStore();

  const navigate = useNavigate();
  const { mutateAsync: registerMutate, isPending } = useMutation({
    mutationFn: (payload: RegistrationPayload) => Api.auth.register(payload),
    onSuccess: ({ data, message }) => {
      if (data) {
        toast.success(message ?? "Register successfully!");
        saveAccessToken(data.accessToken);
        setUser(getUserFromAuthResponse(data));
        navigate(`${Routes.activate}/${data.userId}`);
      } else {
        toast.error("Error occurred. Please, register one more time");
      }
    },
    onError: (error) => {
      handleMutationError(error);
    },
  });

  const onSubmit = async (data: RegisterFormSchema) =>
    await registerMutate(data);

  const inputFields: InputField<RegisterFormSchema>[] = [
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
