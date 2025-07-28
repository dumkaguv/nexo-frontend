import { FormHeader, RegisterForm } from "@/features/auth/components";
import { Card } from "@/components/shared";
import { Routes } from "@/config";

export const RegisterPage = () => {
  return (
    <Card>
      <FormHeader
        titleKey="auth.signUp"
        accountTextKey="auth.haveAccount"
        url={Routes.login}
        urlTextKey="auth.clickHereToSignIn"
      />
      <RegisterForm />
    </Card>
  );
};
