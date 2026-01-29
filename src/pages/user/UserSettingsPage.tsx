import { Card } from '@/shared/ui'
import { SidebarSettings, UserSettingsForm } from '@/widgets/user'

export const UserSettingsPage = () => (
  <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
    <SidebarSettings />

    <main className="w-full flex-1">
      <Card className="flex flex-col gap-5">
        <UserSettingsForm />
      </Card>
    </main>
  </div>
)
