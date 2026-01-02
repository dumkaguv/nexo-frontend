import { Card } from '@/components/shared'
import { paths } from '@/config'
import { FormHeader, RegisterForm } from '@/features/auth/components'

export const RegisterPage = () => (
  <Card>
    <FormHeader
      titleKey="auth.signUp"
      accountTextKey="auth.haveAccount"
      url={paths.auth.login}
      urlTextKey="auth.clickHereToSignIn"
    />
    <RegisterForm />
  </Card>
)
