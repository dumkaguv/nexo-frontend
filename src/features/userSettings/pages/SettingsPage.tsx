import { Card } from '@/components/shared'
import {
  FormAccountSettings,
  SidebarSettings
} from '@/features/userSettings/components'

export const SettingsPage = () => {
  return (
    <div className="flex gap-5">
      <SidebarSettings />

      <main className="w-full flex-1">
        <Card>
          <FormAccountSettings />
        </Card>
      </main>
    </div>
  )
}
