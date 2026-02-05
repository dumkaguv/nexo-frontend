import { Card } from '@/shared/ui'
import { UserSettingsForm } from '@/widgets/user'

export const UserSettingsPage = () => (
  <main className="w-full flex-1">
    <Card className="flex flex-col gap-5">
      <UserSettingsForm />
    </Card>
  </main>
)
