import { Card } from '@/components/shared'
import { paths } from '@/config'
import { FormHeader, RegisterForm } from '@/features/auth/components'

export const RegisterPage = () => (
  <Card>
    <FormHeader
      titleKey="signUp"
      accountTextKey="haveAccount"
      url={paths.auth.login}
      urlTextKey="clickHereToSignIn"
    />
    <RegisterForm />
  </Card>
)
