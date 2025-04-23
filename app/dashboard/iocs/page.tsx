import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { IOCsHeader } from "@/components/iocs-header"
import { IOCsTable } from "@/components/iocs-table"
import { fetchThreatData } from "@/lib/data"

export default async function IOCsPage() {
  // Fetch threat data with proper error handling
  const threatData = await fetchThreatData()

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <DashboardNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <IOCsHeader />
          <div className="mt-6">
            <IOCsTable data={threatData} />
          </div>
        </div>
      </div>
    </div>
  )
}
