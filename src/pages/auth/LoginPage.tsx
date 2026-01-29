import { LoginForm } from '@/features/auth'
import { paths } from '@/shared/config'
import { Card } from '@/shared/ui'
import { FormHeader } from '@/widgets/auth'

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
