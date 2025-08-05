import { useTranslation } from "react-i18next";
import { useFormChangePassword } from "@/features/userSettings/hooks";
import { Label } from "@/components/ui";
import { InputFieldErrors, InputPassword } from "@/components/shared";
import { Section } from "./Section";

export const FormChangePassword = () => {
  const { register, handleSubmit, errors, onSubmit, isPending } =
    useFormChangePassword();

  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Section
        title="changePassword"
        isPending={isPending}
        className="flex flex-col gap-5"
      >
        <div className="flex flex-col gap-5">
          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="currentPassword">{t("currentPassword")}</Label>
            <InputPassword
              id="currentPassword"
              {...register("currentPassword")}
            />
            <InputFieldErrors message={errors.currentPassword?.message} />
          </div>

          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="newPassword">{t("newPassword")}</Label>
            <InputPassword
              id="newPassword"
              {...register("newPassword")}
            />
            <InputFieldErrors message={errors.newPassword?.message} />
          </div>

          <div className="flex w-full flex-col gap-1">
            <Label htmlFor="confirmNewPassword">
              {t("confirmNewPassword")}
            </Label>
            <InputPassword
              id="confirmNewPassword"
              {...register("confirmNewPassword")}
            />
            <InputFieldErrors message={errors.confirmNewPassword?.message} />
          </div>
        </div>
      </Section>
    </form>
  );
};
