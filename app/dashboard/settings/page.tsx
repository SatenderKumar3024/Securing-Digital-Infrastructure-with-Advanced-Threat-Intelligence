import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { SettingsForm } from "@/components/settings-form"

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <DashboardNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and API configurations</p>
          </div>
          <SettingsForm />
        </div>
      </div>
    </div>
  )
}
