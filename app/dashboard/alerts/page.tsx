import { DashboardSidebar } from "@/components/dashboard-sidebar"
import { DashboardNav } from "@/components/dashboard-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, CheckCircle, AlertTriangle, AlertCircle, Clock, Filter, ChevronDown } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function AlertsPage() {
  // Mock alerts data
  const alerts = [
    {
      id: "ALERT-001",
      title: "Critical Vulnerability Detected",
      description: "CVE-2023-1234 affecting multiple systems",
      severity: "critical",
      status: "open",
      timestamp: "2023-12-15T14:32:00Z",
      source: "Vulnerability Scanner",
    },
    {
      id: "ALERT-002",
      title: "Suspicious Login Attempt",
      description: "Multiple failed login attempts from IP 203.0.113.42",
      severity: "high",
      status: "investigating",
      timestamp: "2023-12-15T13:45:00Z",
      source: "SIEM",
    },
    {
      id: "ALERT-003",
      title: "Malware Detected",
      description: "Trojan detected on workstation WS-042",
      severity: "high",
      status: "mitigated",
      timestamp: "2023-12-15T10:12:00Z",
      source: "Endpoint Protection",
    },
    {
      id: "ALERT-004",
      title: "Unusual Network Traffic",
      description: "Unusual outbound traffic to 198.51.100.23:4444",
      severity: "medium",
      status: "open",
      timestamp: "2023-12-15T09:27:00Z",
      source: "Network Monitor",
    },
    {
      id: "ALERT-005",
      title: "New IOC Added to Watchlist",
      description: "Domain malicious-domain.com added to watchlist",
      severity: "low",
      status: "closed",
      timestamp: "2023-12-14T16:05:00Z",
      source: "Threat Intelligence",
    },
  ]

  // Get severity badge color
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-500 border-red-500/20"
      case "high":
        return "bg-orange-500/10 text-orange-500 border-orange-500/20"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
      case "low":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      default:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "bg-blue-500/10 text-blue-500"
      case "investigating":
        return "bg-purple-500/10 text-purple-500"
      case "mitigated":
        return "bg-yellow-500/10 text-yellow-500"
      case "closed":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-slate-500/10 text-slate-500"
    }
  }

  // Get status icon
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return AlertCircle
      case "investigating":
        return AlertTriangle
      case "mitigated":
        return Bell
      case "closed":
        return CheckCircle
      default:
        return AlertCircle
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 to-slate-900">
      <DashboardNav />
      <div className="flex flex-1">
        <DashboardSidebar />
        <div className="flex-1 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-bold tracking-tight">Alerts</h2>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                <ChevronDown className="h-3 w-3" />
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </Button>
            </div>
          </div>
          <p className="mt-2 text-muted-foreground">
            Monitor and manage security alerts from various detection systems.
          </p>

          <Tabs defaultValue="all" className="mt-6">
            <TabsList>
              <TabsTrigger value="all">All Alerts</TabsTrigger>
              <TabsTrigger value="open">Open</TabsTrigger>
              <TabsTrigger value="investigating">Investigating</TabsTrigger>
              <TabsTrigger value="mitigated">Mitigated</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Alerts</CardTitle>
                  <CardDescription>Security alerts from all monitoring systems</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts.map((alert) => {
                      const StatusIcon = getStatusIcon(alert.status)
                      return (
                        <div
                          key={alert.id}
                          className={`rounded-lg border ${
                            alert.severity === "critical" ? "border-red-500/20" : "border-slate-800"
                          } p-4 hover:bg-slate-800/30 transition-colors duration-300`}
                        >
                          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <div className="flex items-center gap-2">
                                <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                  {alert.severity}
                                </Badge>
                                <Badge variant="outline" className={getStatusColor(alert.status)}>
                                  <StatusIcon className="mr-1 h-3 w-3" />
                                  {alert.status}
                                </Badge>
                                <span className="text-xs text-muted-foreground">{alert.id}</span>
                              </div>
                              <h3 className="mt-1 text-base font-medium">{alert.title}</h3>
                              <p className="text-sm text-muted-foreground">{alert.description}</p>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{new Date(alert.timestamp).toLocaleString()}</span>
                              </div>
                              <div className="text-xs">{alert.source}</div>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="open" className="mt-4 space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Open Alerts</CardTitle>
                  <CardDescription>Alerts that require attention</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {alerts
                      .filter((alert) => alert.status === "open")
                      .map((alert) => {
                        const StatusIcon = getStatusIcon(alert.status)
                        return (
                          <div
                            key={alert.id}
                            className={`rounded-lg border ${
                              alert.severity === "critical" ? "border-red-500/20" : "border-slate-800"
                            } p-4 hover:bg-slate-800/30 transition-colors duration-300`}
                          >
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <div className="flex items-center gap-2">
                                  <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                    {alert.severity}
                                  </Badge>
                                  <Badge variant="outline" className={getStatusColor(alert.status)}>
                                    <StatusIcon className="mr-1 h-3 w-3" />
                                    {alert.status}
                                  </Badge>
                                  <span className="text-xs text-muted-foreground">{alert.id}</span>
                                </div>
                                <h3 className="mt-1 text-base font-medium">{alert.title}</h3>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                              </div>
                              <div className="flex flex-col items-end gap-2">
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  <span>{new Date(alert.timestamp).toLocaleString()}</span>
                                </div>
                                <div className="text-xs">{alert.source}</div>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Similar content for other tabs */}
            <TabsContent value="investigating" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investigating Alerts</CardTitle>
                  <CardDescription>Alerts currently under investigation</CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.filter((alert) => alert.status === "investigating").length > 0 ? (
                    <div className="space-y-4">
                      {alerts
                        .filter((alert) => alert.status === "investigating")
                        .map((alert) => {
                          const StatusIcon = getStatusIcon(alert.status)
                          return (
                            <div
                              key={alert.id}
                              className="rounded-lg border border-slate-800 p-4 hover:bg-slate-800/30 transition-colors duration-300"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                      {alert.severity}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                                      <StatusIcon className="mr-1 h-3 w-3" />
                                      {alert.status}
                                    </Badge>
                                  </div>
                                  <h3 className="mt-1 text-base font-medium">{alert.title}</h3>
                                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                      <p className="text-muted-foreground">No alerts currently under investigation</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="mitigated" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Mitigated Alerts</CardTitle>
                  <CardDescription>Alerts that have been mitigated but not yet closed</CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.filter((alert) => alert.status === "mitigated").length > 0 ? (
                    <div className="space-y-4">
                      {alerts
                        .filter((alert) => alert.status === "mitigated")
                        .map((alert) => {
                          const StatusIcon = getStatusIcon(alert.status)
                          return (
                            <div
                              key={alert.id}
                              className="rounded-lg border border-slate-800 p-4 hover:bg-slate-800/30 transition-colors duration-300"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                      {alert.severity}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                                      <StatusIcon className="mr-1 h-3 w-3" />
                                      {alert.status}
                                    </Badge>
                                  </div>
                                  <h3 className="mt-1 text-base font-medium">{alert.title}</h3>
                                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                      <p className="text-muted-foreground">No mitigated alerts</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="closed" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Closed Alerts</CardTitle>
                  <CardDescription>Alerts that have been resolved and closed</CardDescription>
                </CardHeader>
                <CardContent>
                  {alerts.filter((alert) => alert.status === "closed").length > 0 ? (
                    <div className="space-y-4">
                      {alerts
                        .filter((alert) => alert.status === "closed")
                        .map((alert) => {
                          const StatusIcon = getStatusIcon(alert.status)
                          return (
                            <div
                              key={alert.id}
                              className="rounded-lg border border-slate-800 p-4 hover:bg-slate-800/30 transition-colors duration-300"
                            >
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                  <div className="flex items-center gap-2">
                                    <Badge variant="outline" className={getSeverityColor(alert.severity)}>
                                      {alert.severity}
                                    </Badge>
                                    <Badge variant="outline" className={getStatusColor(alert.status)}>
                                      <StatusIcon className="mr-1 h-3 w-3" />
                                      {alert.status}
                                    </Badge>
                                  </div>
                                  <h3 className="mt-1 text-base font-medium">{alert.title}</h3>
                                  <p className="text-sm text-muted-foreground">{alert.description}</p>
                                </div>
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                              </div>
                            </div>
                          )
                        })}
                    </div>
                  ) : (
                    <div className="flex h-40 items-center justify-center rounded-lg border border-dashed">
                      <p className="text-muted-foreground">No closed alerts</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Alert Settings</CardTitle>
              <CardDescription>Configure alert notifications and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Notification Channels</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="email-notifications" className="flex items-center gap-2">
                            Email Notifications
                          </Label>
                          <Switch id="email-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="slack-notifications" className="flex items-center gap-2">
                            Slack Notifications
                          </Label>
                          <Switch id="slack-notifications" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="sms-notifications" className="flex items-center gap-2">
                            SMS Notifications
                          </Label>
                          <Switch id="sms-notifications" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Alert Thresholds</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="critical-alerts" className="flex items-center gap-2">
                            Critical Alerts
                          </Label>
                          <Switch id="critical-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="high-alerts" className="flex items-center gap-2">
                            High Alerts
                          </Label>
                          <Switch id="high-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="medium-alerts" className="flex items-center gap-2">
                            Medium Alerts
                          </Label>
                          <Switch id="medium-alerts" defaultChecked />
                        </div>
                        <div className="flex items-center justify-between">
                          <Label htmlFor="low-alerts" className="flex items-center gap-2">
                            Low Alerts
                          </Label>
                          <Switch id="low-alerts" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
