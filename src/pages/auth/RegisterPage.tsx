import { RegisterForm } from '@/features/auth'
import { paths } from '@/shared/config'
import { Card } from '@/shared/ui'
import { FormHeader } from '@/widgets/auth'

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
