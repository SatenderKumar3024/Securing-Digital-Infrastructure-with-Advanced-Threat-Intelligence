import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, FileText, Calendar, Filter, ChevronDown } from "lucide-react"

export default function ReportsPage() {
  // Mock report data
  const reports = [
    {
      id: "REP-2023-12",
      title: "Monthly Threat Intelligence Summary",
      date: "2023-12-01",
      type: "Monthly",
      status: "Published",
      author: "Security Team",
    },
    {
      id: "REP-2023-11",
      title: "Monthly Threat Intelligence Summary",
      date: "2023-11-01",
      type: "Monthly",
      status: "Published",
      author: "Security Team",
    },
    {
      id: "REP-2023-10",
      title: "Monthly Threat Intelligence Summary",
      date: "2023-10-01",
      type: "Monthly",
      status: "Published",
      author: "Security Team",
    },
    {
      id: "REP-2023-Q3",
      title: "Quarterly Threat Landscape Analysis",
      date: "2023-10-15",
      type: "Quarterly",
      status: "Published",
      author: "Threat Research Team",
    },
    {
      id: "REP-2023-SPECIAL",
      title: "Special Report: Emerging Ransomware Trends",
      date: "2023-09-22",
      type: "Special",
      status: "Published",
      author: "Ransomware Task Force",
    },
  ]

  // Mock scheduled reports
  const scheduledReports = [
    {
      id: "SCHED-2024-01",
      title: "Monthly Threat Intelligence Summary",
      scheduledDate: "2024-01-01",
      type: "Monthly",
      status: "Scheduled",
    },
    {
      id: "SCHED-2024-Q1",
      title: "Quarterly Threat Landscape Analysis",
      scheduledDate: "2024-01-15",
      type: "Quarterly",
      status: "Scheduled",
    },
  ]

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <DashboardNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button variant="default" size="sm" className="gap-1">
                <FileText className="h-4 w-4" />
                <span>New Report</span>
              </Button>
            </div>
          </div>
          <p className="mt-2 text-muted-foreground">
            Access and manage threat intelligence reports and scheduled report generation.
          </p>

          <Tabs defaultValue="published" className="mt-6">
            <TabsList>
              <TabsTrigger value="published">Published Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
              <TabsTrigger value="templates">Report Templates</TabsTrigger>
            </TabsList>

            <TabsContent value="published" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Published Reports</CardTitle>
                  <CardDescription>
                    Access and download previously published threat intelligence reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-slate-800/50 p-3 text-sm font-medium">
                      <div className="col-span-1">ID</div>
                      <div className="col-span-4">Title</div>
                      <div className="col-span-2">Date</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Author</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    {reports.map((report) => (
                      <div
                        key={report.id}
                        className="grid grid-cols-12 items-center border-b p-3 text-sm hover:bg-slate-800/30"
                      >
                        <div className="col-span-1 font-mono text-xs">{report.id}</div>
                        <div className="col-span-4 font-medium">{report.title}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{report.date}</span>
                        </div>
                        <div className="col-span-2">
                          <Badge
                            variant="outline"
                            className={
                              report.type === "Monthly"
                                ? "bg-blue-500/10 text-blue-500"
                                : report.type === "Quarterly"
                                  ? "bg-purple-500/10 text-purple-500"
                                  : "bg-amber-500/10 text-amber-500"
                            }
                          >
                            {report.type}
                          </Badge>
                        </div>
                        <div className="col-span-2">{report.author}</div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scheduled" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Scheduled Reports</CardTitle>
                  <CardDescription>View and manage upcoming scheduled reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 border-b bg-slate-800/50 p-3 text-sm font-medium">
                      <div className="col-span-2">ID</div>
                      <div className="col-span-5">Title</div>
                      <div className="col-span-2">Scheduled Date</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-1">Actions</div>
                    </div>
                    {scheduledReports.map((report) => (
                      <div
                        key={report.id}
                        className="grid grid-cols-12 items-center border-b p-3 text-sm hover:bg-slate-800/30"
                      >
                        <div className="col-span-2 font-mono text-xs">{report.id}</div>
                        <div className="col-span-5 font-medium">{report.title}</div>
                        <div className="col-span-2 flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{report.scheduledDate}</span>
                        </div>
                        <div className="col-span-2">
                          <Badge
                            variant="outline"
                            className={
                              report.type === "Monthly"
                                ? "bg-blue-500/10 text-blue-500"
                                : "bg-purple-500/10 text-purple-500"
                            }
                          >
                            {report.type}
                          </Badge>
                        </div>
                        <div className="col-span-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ChevronDown className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="templates" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Report Templates</CardTitle>
                  <CardDescription>Manage and create report templates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {[
                      "Monthly Summary",
                      "Quarterly Analysis",
                      "Executive Brief",
                      "Incident Report",
                      "Custom Template",
                    ].map((template, index) => (
                      <Card key={index} className="hover:border-cyan-500/50 transition-colors duration-300">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-base">{template}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-xs text-muted-foreground">
                            {index === 4
                              ? "Create a custom report template"
                              : `Standard template for ${template.toLowerCase()} reports`}
                          </p>
                          <Button variant="outline" size="sm" className="mt-4 w-full">
                            {index === 4 ? "Create New" : "Use Template"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
