import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAvatarSchema } from "@/zodSchemas";
import type { CreateAvatarSchema } from "@/zodSchemas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Api } from "@/services/apiClient";
import { handleMutationError } from "@/utils";
import toast from "react-hot-toast";
import { useAuthStore } from "@/stores";
import { QueryKeys } from "@/config";

const MAX_FILE_SIZE_MB = 4;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024;

export const useUploadAvatar = () => {
  const { profile, setProfile } = useAuthStore();

  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileSizeError, setFileSizeError] = useState<string | undefined>(
    undefined
  );

  const queryClient = useQueryClient();

  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAvatarSchema>({
    resolver: zodResolver(createAvatarSchema(t)),
  });

  const { mutateAsync: uploadAvatar, isPending } = useMutation({
    mutationFn: () => Api.upload.uploadAvatar(file!),
    onSuccess: ({ message }) => toast.success(message ?? t("uploadSuccess")),
    onError: (error) => handleMutationError(error),
  });

  const onFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];

      if (file.size > MAX_FILE_SIZE) {
        setFileSizeError(
          t("validation.fileTooLarge", { max: MAX_FILE_SIZE_MB })
        );
        return;
      }

      setFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    } else {
      setPreviewUrl(null);
      setFile(null);
    }
  };

  const onSubmit = async () => {
    const response = await uploadAvatar();
    queryClient.invalidateQueries({ queryKey: [QueryKeys.Profile.root] });

    if (response.data) {
      setProfile(response.data);
    }
  };

  useEffect(() => {
    if (profile) {
      setPreviewUrl(profile.avatarUrl ?? null);
    }
  }, [profile]);

  return {
    handleSubmit,
    onSubmit,
    onFileChange,
    control,
    errors,
    previewUrl,
    fileSizeError,
    uploadAvatar,
    isPending,
    file,
  };
};
