import { DashboardHeader } from "@/components/dashboard-header"
import { GlobeThreatMap } from "@/components/globe-threat-map"
import { ThreatTypeChart } from "@/components/threat-type-chart"
import { IOCDistributionChart } from "@/components/ioc-distribution-chart"
import { ThreatTrendChart } from "@/components/threat-trend-chart"
import { RecentIOCsTable } from "@/components/recent-iocs-table"
import { fetchThreatData } from "@/lib/data"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function DashboardPage() {
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
          <DashboardHeader />

          <Tabs defaultValue="global" className="mt-6">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="global">Global View</TabsTrigger>
              <TabsTrigger value="canada">Canada Focus</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="mt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <GlobeThreatMap data={threatData} />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ThreatTypeChart data={threatData} />
                  <IOCDistributionChart data={threatData} />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="canada" className="mt-4">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="h-[400px] rounded-lg border bg-card p-4 shadow-sm">
                  <h3 className="text-lg font-medium">Canada Threat Map</h3>
                  <div className="flex h-full items-center justify-center">
                    <p className="text-muted-foreground">Canada-specific threat data visualization coming soon</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ThreatTypeChart data={threatData} />
                  <IOCDistributionChart data={threatData} />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <ThreatTrendChart data={threatData} />
          </div>

          <div className="mt-6">
            <RecentIOCsTable data={threatData} />
          </div>
        </div>
      </div>
    </div>
  )
}
