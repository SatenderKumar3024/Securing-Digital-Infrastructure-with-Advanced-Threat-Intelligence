"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, ExternalLink, Copy, AlertTriangle, Shield, Globe, Calendar } from "lucide-react"
import type { Indicator } from "@/lib/types"

interface ThreatDetailsPanelProps {
  indicator: Indicator
  onClose: () => void
}

export function ThreatDetailsPanel({ indicator, onClose }: ThreatDetailsPanelProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Get severity level based on confidence
  const getSeverityLevel = (confidence: number) => {
    if (confidence >= 80) return { level: "Critical", color: "bg-threat-critical/10 text-threat-critical" }
    if (confidence >= 60) return { level: "High", color: "bg-threat-high/10 text-threat-high" }
    if (confidence >= 40) return { level: "Medium", color: "bg-chart-1/10 text-chart-1" }
    return { level: "Low", color: "bg-chart-4/10 text-chart-4" }
  }

  const severity = getSeverityLevel(indicator.confidence)

  // Generate mock related indicators
  const relatedIndicators = [
    {
      indicator:
        indicator.type === "ip"
          ? "192.168.1.2"
          : indicator.type === "domain"
            ? "malicious-related.com"
            : "related-file.exe",
      type: indicator.type,
      confidence: Math.floor(Math.random() * 20) + indicator.confidence - 10,
      relation: "Same campaign",
    },
    {
      indicator:
        indicator.type === "ip"
          ? "10.0.0.5"
          : indicator.type === "domain"
            ? "threat-related.net"
            : "malware-variant.dll",
      type: indicator.type,
      confidence: Math.floor(Math.random() * 20) + indicator.confidence - 10,
      relation: "Same actor",
    },
  ]

  // Generate mock timeline events
  const timelineEvents = [
    {
      date: new Date(new Date(indicator.timestamp).getTime() - 1000 * 60 * 60 * 24 * 3).toISOString(),
      event: "First observed in the wild",
      source: "Community report",
    },
    {
      date: new Date(new Date(indicator.timestamp).getTime() - 1000 * 60 * 60 * 12).toISOString(),
      event: "Added to threat intelligence database",
      source: indicator.source,
    },
    {
      date: indicator.timestamp,
      event: "Last activity detected",
      source: "Automated monitoring",
    },
  ]

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-5 duration-300">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onClose} className="gap-1">
          <ArrowLeft className="h-4 w-4" />
          Back to IOCs
        </Button>
        <Badge variant="outline" className={severity.color}>
          {severity.level} Severity
        </Badge>
      </div>

      <Card className="border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
        <CardHeader className="pb-2">
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-medium">Threat Details</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => copyToClipboard(indicator.indicator)}
                >
                  {copied ? <Badge variant="outline">Copied!</Badge> : <Copy className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm font-mono text-muted-foreground">{indicator.indicator}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="related">Related IOCs</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Type</p>
                  <p className="text-sm font-medium">{indicator.type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Threat Type</p>
                  <p className="text-sm font-medium">{indicator.threat_type}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Source</p>
                  <p className="text-sm font-medium">{indicator.source}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Country</p>
                  <p className="text-sm font-medium">{indicator.country}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">Confidence</p>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-slate-700">
                      <div
                        className={`h-full rounded-full ${
                          indicator.confidence > 80
                            ? "bg-threat-critical"
                            : indicator.confidence > 50
                              ? "bg-threat-high"
                              : "bg-chart-4"
                        }`}
                        style={{ width: `${indicator.confidence}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{indicator.confidence}%</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">First Seen</p>
                  <p className="text-sm font-medium">
                    {new Date(new Date(indicator.timestamp).getTime() - 1000 * 60 * 60 * 24 * 3).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 text-sm font-medium">Threat Intelligence Summary</h3>
                <p className="text-sm text-muted-foreground">
                  This {indicator.type} has been identified as part of a {indicator.threat_type.toLowerCase()} campaign
                  originating from {indicator.country}. It was first observed in threat intelligence feeds on{" "}
                  {new Date(new Date(indicator.timestamp).getTime() - 1000 * 60 * 60 * 24 * 3).toLocaleDateString()} and
                  has been reported by multiple sources with a confidence score of {indicator.confidence}%.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs">
                    <AlertTriangle className="h-3 w-3 text-threat-high" />
                    <span>Active Threat</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs">
                    <Shield className="h-3 w-3 text-chart-1" />
                    <span>Block Recommended</span>
                  </div>
                  <div className="flex items-center gap-1 rounded-full bg-slate-800 px-3 py-1 text-xs">
                    <Globe className="h-3 w-3 text-chart-4" />
                    <span>{indicator.country}</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="related" className="mt-4">
              <div className="space-y-4">
                {relatedIndicators.map((related, index) => (
                  <div key={index} className="rounded-lg border border-border p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{related.type}</Badge>
                        <span className="font-mono text-sm">{related.indicator}</span>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          related.confidence > 80
                            ? "bg-threat-critical/10 text-threat-critical"
                            : related.confidence > 60
                              ? "bg-threat-high/10 text-threat-high"
                              : "bg-chart-4/10 text-chart-4"
                        }
                      >
                        {related.confidence}%
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground">Relation: {related.relation}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <div className="space-y-4">
                {timelineEvents.map((event, index) => (
                  <div key={index} className="relative pl-6">
                    <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-accent"></div>
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute bottom-0 left-1.5 top-4 w-px -translate-x-1/2 bg-border"></div>
                    )}
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {new Date(event.date).toLocaleDateString()} {new Date(event.date).toLocaleTimeString()}
                        </span>
                      </div>
                      <p className="text-sm font-medium">{event.event}</p>
                      <p className="text-xs text-muted-foreground">Source: {event.source}</p>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
