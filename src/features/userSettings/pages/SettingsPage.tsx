import { Card } from '@/components/shared'
import {
  FormAccountSettings,
  SidebarSettings
} from '@/features/userSettings/components'

export const SettingsPage = () => (
  <div className="flex flex-col gap-5 lg:flex-row lg:items-start">
    <SidebarSettings />

    <main className="w-full flex-1">
      <Card>
        <FormAccountSettings />
      </Card>
    </main>
  </div>
)
