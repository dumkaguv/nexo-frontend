import { Card } from '@/components/shared'
import { Routes } from '@/config'
import { FormHeader, RegisterForm } from '@/features/auth/components'

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
  )
}
