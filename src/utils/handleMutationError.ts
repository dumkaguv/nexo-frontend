import toast from "react-hot-toast";
import { AxiosError } from "axios";
import type { ApiResponse } from "@/types";

export const handleMutationError = (error: unknown) => {
  const axiosError = error as AxiosError<ApiResponse>;
  toast.error(
    axiosError.response?.data.message ?? "Error occurred! Please try again."
  );

  console.log(error);
};
