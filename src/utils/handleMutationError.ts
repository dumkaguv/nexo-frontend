import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { i18n } from "@/config";
import type { ApiResponse } from "@/types";

export const handleMutationError = (error: unknown, message?: string) => {
  const axiosError = error as AxiosError<ApiResponse>;
  toast.error(
    axiosError.response?.data.message ?? message ?? i18n.t("error.generic")
  );

  console.log(error);
};
