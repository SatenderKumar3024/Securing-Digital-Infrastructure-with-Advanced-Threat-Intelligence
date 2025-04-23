import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { IOCsHeader } from "@/components/iocs-header"
import { IOCsTable } from "@/components/iocs-table"
import { fetchThreatData } from "@/lib/data"

export default async function IOCsPage() {
  let threatData

  try {
    // Try to fetch from API routes first
    const [otxResponse, abuseipdbResponse] = await Promise.allSettled([fetch("/api/otx"), fetch("/api/abuseipdb")])

    let combinedIndicators = []

    if (otxResponse.status === "fulfilled" && otxResponse.value.ok) {
      const otxData = await otxResponse.value.json()
      combinedIndicators = [...combinedIndicators, ...(otxData.indicators || [])]
    }

    if (abuseipdbResponse.status === "fulfilled" && abuseipdbResponse.value.ok) {
      const abuseipdbData = await abuseipdbResponse.value.json()
      combinedIndicators = [...combinedIndicators, ...(abuseipdbData.indicators || [])]
    }

    // If we got data from the APIs, use it
    if (combinedIndicators.length > 0) {
      threatData = { indicators: combinedIndicators }
    } else {
      // Otherwise fall back to mock data
      threatData = await fetchThreatData()
    }
  } catch (error) {
    console.error("Error fetching threat data:", error)
    threatData = await fetchThreatData() // Fall back to mock data
  }

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
