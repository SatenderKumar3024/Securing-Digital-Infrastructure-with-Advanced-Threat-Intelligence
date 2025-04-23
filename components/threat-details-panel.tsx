"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import type { Indicator } from "@/lib/types"

export function ThreatDetailsPanel({
  indicator,
  onClose,
}: {
  indicator: Indicator
  onClose: () => void
}) {
  return (
    <Card className="border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Threat Details</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="related">Related IOCs</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4 pt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Indicator</p>
                <p className="font-mono text-sm">{indicator.indicator}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <Badge variant="outline" className="mt-1">
                  {indicator.type}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Threat Type</p>
                <p>{indicator.threat_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Source</p>
                <Badge
                  variant="outline"
                  className={`mt-1 ${
                    indicator.source === "OTX" ? "bg-blue-500/10 text-blue-500" : "bg-green-500/10 text-green-500"
                  }`}
                >
                  {indicator.source}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Country</p>
                <Badge variant="outline" className="mt-1 bg-purple-500/10 text-purple-500">
                  {indicator.country}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-slate-700">
                    <div
                      className={`h-full rounded-full ${
                        indicator.confidence > 80
                          ? "bg-red-500"
                          : indicator.confidence > 50
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${indicator.confidence}%` }}
                    />
                  </div>
                  <span>{indicator.confidence}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                <p>{new Date(indicator.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div className="rounded-md bg-slate-800/50 p-4">
              <h4 className="mb-2 font-medium">Recommended Actions</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Add to blocklist in firewall</li>
                <li>Scan systems for this indicator</li>
                <li>Check logs for previous occurrences</li>
                <li>Share with security team</li>
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="related" className="pt-4">
            <div className="rounded-md bg-slate-800/50 p-4 text-center">
              <p className="text-sm text-muted-foreground">No related IOCs found for this indicator.</p>
            </div>
          </TabsContent>

          <TabsContent value="timeline" className="pt-4">
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="h-full w-px bg-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">{new Date(indicator.timestamp).toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">First observed</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-2 w-2 rounded-full bg-blue-500" />
                  <div className="h-full w-px bg-slate-700" />
                </div>
                <div>
                  <p className="text-sm font-medium">{new Date().toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Added to database</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
