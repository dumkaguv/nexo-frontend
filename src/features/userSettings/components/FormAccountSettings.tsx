import { useTranslation } from "react-i18next";
import { FormMainSettings } from "./FormMainSettings";
import { FormUploadAvatar } from "./FormUploadAvatar";
import { FormChangePassword } from "./FormChangePassword";

export const FormAccountSettings = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">{t("accountSettings")}</h1>

      <FormMainSettings />
      <FormUploadAvatar />
      <FormChangePassword />
    </div>
  );
};
