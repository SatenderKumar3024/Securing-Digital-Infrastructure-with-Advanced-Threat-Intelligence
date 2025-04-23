"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
  Area,
  ComposedChart,
  Brush,
} from "recharts"
import type { ThreatData } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Clock, Clock1, Clock4, BarChart3, LineChartIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function ThreatTrendChart({ data }: { data: ThreatData }) {
  const [timeRange, setTimeRange] = useState<"24h" | "7d" | "30d">("24h")
  const [chartType, setChartType] = useState<"line" | "area" | "composed">("area")
  const [showBrush, setShowBrush] = useState(false)

  // Group threats by hour for the last 24 hours
  const now = new Date()

  // Generate time-based data based on selected range
  const generateTimeData = () => {
    let intervals: number
    let intervalUnit: "hours" | "days"
    let format: string

    switch (timeRange) {
      case "7d":
        intervals = 7
        intervalUnit = "days"
        format = "MMM D"
        break
      case "30d":
        intervals = 30
        intervalUnit = "days"
        format = "MMM D"
        break
      default: // 24h
        intervals = 24
        intervalUnit = "hours"
        format = "HH:mm"
    }

    const timeData = Array.from({ length: intervals }, (_, i) => {
      const time = new Date(now)
      if (intervalUnit === "hours") {
        time.setHours(now.getHours() - (intervals - 1) + i)
        time.setMinutes(0, 0, 0)
      } else {
        time.setDate(now.getDate() - (intervals - 1) + i)
        time.setHours(0, 0, 0, 0)
      }

      return {
        time: time.toISOString(),
        count: 0,
        malware: 0,
        phishing: 0,
        ransomware: 0,
        scanning: 0,
        botnet: 0,
      }
    })

    return timeData
  }

  const timeData = generateTimeData()

  // Count threats by time period and type
  data?.indicators?.forEach((indicator) => {
    const timestamp = new Date(indicator.timestamp)
    let index: number

    if (timeRange === "24h") {
      index = timeData.findIndex((item) => {
        const itemTime = new Date(item.time)
        return timestamp >= itemTime && timestamp < new Date(itemTime.getTime() + 60 * 60 * 1000)
      })
    } else {
      index = timeData.findIndex((item) => {
        const itemTime = new Date(item.time)
        return (
          timestamp.getDate() === itemTime.getDate() &&
          timestamp.getMonth() === itemTime.getMonth() &&
          timestamp.getFullYear() === itemTime.getFullYear()
        )
      })
    }

    if (index >= 0) {
      timeData[index].count++

      // Count by threat type
      const threatType = indicator.threat_type.toLowerCase()
      if (threatType.includes("malware")) {
        timeData[index].malware++
      } else if (threatType.includes("phishing")) {
        timeData[index].phishing++
      } else if (threatType.includes("ransom")) {
        timeData[index].ransomware++
      } else if (threatType.includes("scan")) {
        timeData[index].scanning++
      } else if (threatType.includes("botnet")) {
        timeData[index].botnet++
      }
    }
  })

  // Format the data for the chart
  const chartData = timeData.map((item) => ({
    name: new Date(item.time).toLocaleTimeString([], {
      hour: "2-digit",
      hour12: false,
      ...(timeRange !== "24h" && { day: "2-digit", month: "short" }),
    }),
    value: item.count,
    malware: item.malware,
    phishing: item.phishing,
    ransomware: item.ransomware,
    scanning: item.scanning,
    botnet: item.botnet,
  }))

  // Calculate average for reference line
  const average = Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length)

  // Add Canadian time zone formatting
  const formatCanadianTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("en-CA", {
      timeZone: "America/Toronto",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
  }

  // Render the appropriate chart based on the selected type
  const renderChart = () => {
    switch (chartType) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: showBrush ? 30 : 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={timeRange === "24h" ? 3 : 0}
                angle={timeRange !== "24h" ? -45 : 0}
                height={50}
                textAnchor={timeRange !== "24h" ? "end" : "middle"}
              />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={25} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                formatter={(value, name) => {
                  const formattedName = name === "value" ? "Total" : name.charAt(0).toUpperCase() + name.slice(1)
                  return [value, formattedName]
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (value === "value" ? "Total" : value.charAt(0).toUpperCase() + value.slice(1))}
              />
              <ReferenceLine
                y={average}
                stroke="hsl(var(--accent))"
                strokeDasharray="3 3"
                label={{
                  value: `Avg: ${average}`,
                  position: "insideTopRight",
                  fill: "hsl(var(--accent))",
                  fontSize: 10,
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--accent))" }}
                activeDot={{ r: 5, stroke: "hsl(var(--background))", strokeWidth: 1 }}
              />
              <Line
                type="monotone"
                dataKey="malware"
                stroke="hsl(var(--chart-1))"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "hsl(var(--chart-1))" }}
                activeDot={{ r: 4, stroke: "hsl(var(--background))", strokeWidth: 1 }}
                opacity={0.7}
              />
              <Line
                type="monotone"
                dataKey="phishing"
                stroke="hsl(var(--chart-2))"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "hsl(var(--chart-2))" }}
                activeDot={{ r: 4, stroke: "hsl(var(--background))", strokeWidth: 1 }}
                opacity={0.7}
              />
              <Line
                type="monotone"
                dataKey="ransomware"
                stroke="hsl(var(--threat-critical))"
                strokeWidth={1.5}
                dot={{ r: 2, fill: "hsl(var(--threat-critical))" }}
                activeDot={{ r: 4, stroke: "hsl(var(--background))", strokeWidth: 1 }}
                opacity={0.7}
              />
              {showBrush && <Brush dataKey="name" height={20} stroke="hsl(var(--accent))" />}
            </LineChart>
          </ResponsiveContainer>
        )
      case "area":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: showBrush ? 30 : 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={timeRange === "24h" ? 3 : 0}
                angle={timeRange !== "24h" ? -45 : 0}
                height={50}
                textAnchor={timeRange !== "24h" ? "end" : "middle"}
              />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={25} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                formatter={(value, name) => {
                  const formattedName = name === "value" ? "Total" : name.charAt(0).toUpperCase() + name.slice(1)
                  return [value, formattedName]
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (value === "value" ? "Total" : value.charAt(0).toUpperCase() + value.slice(1))}
              />
              <ReferenceLine
                y={average}
                stroke="hsl(var(--accent))"
                strokeDasharray="3 3"
                label={{
                  value: `Avg: ${average}`,
                  position: "insideTopRight",
                  fill: "hsl(var(--accent))",
                  fontSize: 10,
                }}
              />
              <Area
                type="monotone"
                dataKey="malware"
                stackId="1"
                stroke="hsl(var(--chart-1))"
                fill="hsl(var(--chart-1))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="phishing"
                stackId="1"
                stroke="hsl(var(--chart-2))"
                fill="hsl(var(--chart-2))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="ransomware"
                stackId="1"
                stroke="hsl(var(--threat-critical))"
                fill="hsl(var(--threat-critical))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="scanning"
                stackId="1"
                stroke="hsl(var(--chart-4))"
                fill="hsl(var(--chart-4))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="botnet"
                stackId="1"
                stroke="hsl(var(--chart-5))"
                fill="hsl(var(--chart-5))"
                fillOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--accent))" }}
              />
              {showBrush && <Brush dataKey="name" height={20} stroke="hsl(var(--accent))" />}
            </ComposedChart>
          </ResponsiveContainer>
        )
      case "composed":
        return (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={chartData}
              margin={{
                top: 20,
                right: 10,
                left: 10,
                bottom: showBrush ? 30 : 10,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="name"
                tick={{ fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={timeRange === "24h" ? 3 : 0}
                angle={timeRange !== "24h" ? -45 : 0}
                height={50}
                textAnchor={timeRange !== "24h" ? "end" : "middle"}
              />
              <YAxis tick={{ fontSize: 10 }} tickLine={false} axisLine={false} width={25} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                formatter={(value, name) => {
                  const formattedName = name === "value" ? "Total" : name.charAt(0).toUpperCase() + name.slice(1)
                  return [value, formattedName]
                }}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => (value === "value" ? "Total" : value.charAt(0).toUpperCase() + value.slice(1))}
              />
              <ReferenceLine
                y={average}
                stroke="hsl(var(--accent))"
                strokeDasharray="3 3"
                label={{
                  value: `Avg: ${average}`,
                  position: "insideTopRight",
                  fill: "hsl(var(--accent))",
                  fontSize: 10,
                }}
              />
              <Area
                type="monotone"
                dataKey="malware"
                fill="hsl(var(--chart-1))"
                stroke="hsl(var(--chart-1))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="phishing"
                fill="hsl(var(--chart-2))"
                stroke="hsl(var(--chart-2))"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="ransomware"
                fill="hsl(var(--threat-critical))"
                stroke="hsl(var(--threat-critical))"
                fillOpacity={0.3}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="hsl(var(--accent))"
                strokeWidth={2}
                dot={{ r: 3, fill: "hsl(var(--accent))" }}
              />
              {showBrush && <Brush dataKey="name" height={20} stroke="hsl(var(--accent))" />}
            </ComposedChart>
          </ResponsiveContainer>
        )
      default:
        return null
    }
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <CardTitle className="text-base font-medium">Threat Trend</CardTitle>
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1">
              <Button
                variant={timeRange === "24h" ? "default" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTimeRange("24h")}
              >
                <Clock className="mr-1 h-3 w-3" />
                24h
              </Button>
              <Button
                variant={timeRange === "7d" ? "default" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTimeRange("7d")}
              >
                <Clock1 className="mr-1 h-3 w-3" />
                7d
              </Button>
              <Button
                variant={timeRange === "30d" ? "default" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setTimeRange("30d")}
              >
                <Clock4 className="mr-1 h-3 w-3" />
                30d
              </Button>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant={chartType === "line" ? "default" : "outline"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setChartType("line")}
                title="Line Chart"
              >
                <LineChartIcon className="h-3.5 w-3.5" />
                <span className="sr-only">Line Chart</span>
              </Button>
              <Button
                variant={chartType === "area" ? "default" : "outline"}
                size="sm"
                className="h-7 w-7 p-0"
                onClick={() => setChartType("area")}
                title="Area Chart"
              >
                <BarChart3 className="h-3.5 w-3.5" />
                <span className="sr-only">Area Chart</span>
              </Button>
              <Button
                variant={showBrush ? "default" : "outline"}
                size="sm"
                className="h-7 px-2 text-xs"
                onClick={() => setShowBrush(!showBrush)}
              >
                Zoom
              </Button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-xs text-accent">
            {timeRange === "24h" ? "Last 24 Hours" : timeRange === "7d" ? "Last 7 Days" : "Last 30 Days"}
          </Badge>
          <Badge variant="outline" className="bg-accent/10 text-xs text-accent">
            Eastern Time (ET)
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="chart" className="w-full">
          <TabsList className="mb-2 w-full grid grid-cols-2">
            <TabsTrigger value="chart">Chart View</TabsTrigger>
            <TabsTrigger value="table">Table View</TabsTrigger>
          </TabsList>
          <TabsContent value="chart" className="w-full">
            <div className="h-[300px]">{renderChart()}</div>
          </TabsContent>
          <TabsContent value="table">
            <div className="max-h-[300px] overflow-auto rounded-md border">
              <table className="w-full text-sm">
                <thead className="sticky top-0 bg-slate-900">
                  <tr className="border-b">
                    <th className="p-2 text-left">Time</th>
                    <th className="p-2 text-right">Total</th>
                    <th className="p-2 text-right">Malware</th>
                    <th className="p-2 text-right">Phishing</th>
                    <th className="p-2 text-right">Ransomware</th>
                    <th className="p-2 text-right">Scanning</th>
                    <th className="p-2 text-right">Botnet</th>
                  </tr>
                </thead>
                <tbody>
                  {chartData.map((item, index) => (
                    <tr key={index} className="border-b hover:bg-slate-800/50">
                      <td className="p-2">{item.name}</td>
                      <td className="p-2 text-right font-medium">{item.value}</td>
                      <td className="p-2 text-right text-chart-1">{item.malware}</td>
                      <td className="p-2 text-right text-chart-2">{item.phishing}</td>
                      <td className="p-2 text-right text-threat-critical">{item.ransomware}</td>
                      <td className="p-2 text-right text-chart-4">{item.scanning}</td>
                      <td className="p-2 text-right text-chart-5">{item.botnet}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
