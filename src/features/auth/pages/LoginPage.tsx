import { Card } from '@/components/shared'
import { paths } from '@/config'
import { FormHeader, LoginForm } from '@/features/auth/components'

export const LoginPage = () => (
  <Card>
    <FormHeader
      titleKey="signIn"
      accountTextKey="dontHaveAccount"
      urlTextKey="clickHereToSignUp"
      url={paths.auth.register}
    />
    <LoginForm />
  </Card>
)
