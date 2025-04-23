"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LabelList } from "recharts"
import type { ThreatData } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Clock1, Clock4 } from "lucide-react"

export function ThreatTypeChart({ data }: { data: ThreatData }) {
  const [timeRange, setTimeRange] = useState<"60m" | "12h" | "24h">("24h")

  // Filter data based on time range
  const filterDataByTime = (data: ThreatData, range: string) => {
    if (!data?.indicators || data.indicators.length === 0) {
      // Generate some mock data if no data is available
      return generateMockThreatData(range)
    }

    const now = new Date()
    const cutoff = new Date(now)

    switch (range) {
      case "60m":
        cutoff.setHours(now.getHours() - 1)
        break
      case "12h":
        cutoff.setHours(now.getHours() - 12)
        break
      case "24h":
      default:
        cutoff.setHours(now.getHours() - 24)
    }

    return data.indicators.filter((indicator) => {
      const timestamp = new Date(indicator.timestamp)
      return timestamp >= cutoff
    })
  }

  // Add this function to generate mock data if needed
  const generateMockThreatData = (range: string) => {
    const threatTypes = ["Malware", "Phishing", "Ransomware", "C2", "Botnet", "Scanning"]
    const count = range === "60m" ? 20 : range === "12h" ? 50 : 100

    const mockData = []
    for (let i = 0; i < count; i++) {
      const randomType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
      const now = new Date()

      // Generate random timestamp within the selected time range
      const timestamp = new Date(now)
      if (range === "60m") {
        timestamp.setMinutes(now.getMinutes() - Math.floor(Math.random() * 60))
      } else if (range === "12h") {
        timestamp.setHours(now.getHours() - Math.floor(Math.random() * 12))
      } else {
        timestamp.setHours(now.getHours() - Math.floor(Math.random() * 24))
      }

      mockData.push({
        indicator: `mock-indicator-${i}`,
        type: "ip",
        threat_type: randomType,
        timestamp: timestamp.toISOString(),
        country: "US",
        confidence: Math.floor(Math.random() * 100),
        source: "Mock",
      })
    }

    return mockData
  }

  const filteredIndicators = filterDataByTime(data, timeRange)

  // Count threats by type
  const threatTypeCounts = filteredIndicators.reduce(
    (acc, indicator) => {
      const type = indicator.threat_type
      if (!acc[type]) {
        acc[type] = 0
      }
      acc[type]++
      return acc
    },
    {} as Record<string, number>,
  )

  // Convert to array and sort by count
  const chartData = Object.entries(threatTypeCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 5) // Top 5

  const colors = [
    "#8B5CF6", // bright purple
    "#EC4899", // bright pink
    "#F43F5E", // bright red
    "#F59E0B", // bright amber
    "#10B981", // bright green
  ]

  // Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  // Get time range label
  const getTimeRangeLabel = () => {
    switch (timeRange) {
      case "60m":
        return "Last 60 min"
      case "12h":
        return "Last 12h"
      case "24h":
        return "Last 24h"
      default:
        return "Last 24h"
    }
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">Top Threat Types</CardTitle>
          <div className="flex items-center gap-1">
            <Button
              variant={timeRange === "60m" ? "default" : "outline"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setTimeRange("60m")}
            >
              <Clock className="mr-1 h-3 w-3" />
              60m
            </Button>
            <Button
              variant={timeRange === "12h" ? "default" : "outline"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setTimeRange("12h")}
            >
              <Clock1 className="mr-1 h-3 w-3" />
              12h
            </Button>
            <Button
              variant={timeRange === "24h" ? "default" : "outline"}
              size="sm"
              className="h-7 px-2 text-xs"
              onClick={() => setTimeRange("24h")}
            >
              <Clock4 className="mr-1 h-3 w-3" />
              24h
            </Button>
          </div>
        </div>
        <Badge variant="outline" className="mt-2 w-fit bg-accent/10 text-xs text-accent">
          {getTimeRangeLabel()}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
                barSize={24}
                layout="vertical"
              >
                <XAxis type="number" hide />
                <YAxis
                  dataKey="name"
                  type="category"
                  tick={{ fontSize: 12, fill: "#ffffff" }}
                  tickLine={false}
                  axisLine={false}
                  width={80}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "4px",
                    fontSize: "12px",
                    color: "#ffffff",
                  }}
                  cursor={{ fill: "rgba(255, 255, 255, 0.05)" }}
                  formatter={(value, name) => [`${value} (${Math.round((value / total) * 100)}%)`, name]}
                  labelStyle={{ color: "#ffffff" }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                  ))}
                  <LabelList
                    dataKey="value"
                    position="right"
                    style={{ fill: "#ffffff", fontSize: 12, fontWeight: 500 }}
                    formatter={(value: number) => `${value}`}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">Loading threat data...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
