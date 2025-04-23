import type { Metadata } from "next"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { GlobeThreatMap } from "@/components/globe-threat-map"
import { CanadaThreatMap } from "@/components/canada-threat-map"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export const metadata: Metadata = {
  title: "Global Threats | Cybersecurity Dashboard",
  description: "Visualize global and regional cyber threats",
}

export default function GlobalThreatsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <DashboardNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Global Threats</h2>
          </div>

          <Tabs defaultValue="global" className="mt-6 space-y-4">
            <TabsList>
              <TabsTrigger value="global">Global View</TabsTrigger>
              <TabsTrigger value="canada">Canada</TabsTrigger>
            </TabsList>

            <TabsContent value="global" className="space-y-4">
              <GlobeThreatMap />

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Threat Origins</CardTitle>
                    <CardDescription>Countries with highest malicious activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { country: "China", percentage: 24, count: 1243 },
                        { country: "Russia", percentage: 18, count: 932 },
                        { country: "North Korea", percentage: 12, count: 621 },
                        { country: "Iran", percentage: 9, count: 465 },
                        { country: "United States", percentage: 7, count: 362 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.count} threats</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Target Countries</CardTitle>
                    <CardDescription>Most frequently targeted countries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { country: "United States", percentage: 32, count: 1654 },
                        { country: "United Kingdom", percentage: 14, count: 723 },
                        { country: "Germany", percentage: 11, count: 568 },
                        { country: "Canada", percentage: 9, count: 465 },
                        { country: "Australia", percentage: 7, count: 362 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.country}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.count} threats</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="canada" className="space-y-4">
              <CanadaThreatMap />

              <div className="grid gap-4 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Targeted Provinces</CardTitle>
                    <CardDescription>Provinces with highest threat activity</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { province: "Ontario", percentage: 38, count: 432 },
                        { province: "Quebec", percentage: 24, count: 273 },
                        { province: "British Columbia", percentage: 18, count: 205 },
                        { province: "Alberta", percentage: 12, count: 137 },
                        { province: "Manitoba", percentage: 8, count: 91 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.province}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.count} threats</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Canadian Sectors Targeted</CardTitle>
                    <CardDescription>Industries most affected by cyber threats</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        { sector: "Financial Services", percentage: 27, count: 308 },
                        { sector: "Healthcare", percentage: 21, count: 239 },
                        { sector: "Government", percentage: 18, count: 205 },
                        { sector: "Energy", percentage: 14, count: 159 },
                        { sector: "Education", percentage: 11, count: 125 },
                        { sector: "Manufacturing", percentage: 9, count: 102 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{item.sector}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">{item.count} threats</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
