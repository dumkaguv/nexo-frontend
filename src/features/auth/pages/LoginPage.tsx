import { Card } from '@/components/shared'
import { paths } from '@/config'
import { FormHeader, LoginForm } from '@/features/auth/components'

export const LoginPage = () => {
  return (
    <Card>
      <FormHeader
        titleKey="auth.signIn"
        accountTextKey="auth.dontHaveAccount"
        urlTextKey="auth.clickHereToSignUp"
        url={paths.auth.register}
      />
      <LoginForm />
    </Card>
  )
}
