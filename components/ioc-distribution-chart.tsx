"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, Sector } from "recharts"
import type { ThreatData } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

export function IOCDistributionChart({ data }: { data: ThreatData }) {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(undefined)

  // Count IOCs by type
  const iocTypeCounts =
    data?.indicators?.reduce(
      (acc, indicator) => {
        const type = indicator.type
        if (!acc[type]) {
          acc[type] = 0
        }
        acc[type]++
        return acc
      },
      {} as Record<string, number>,
    ) || {}

  // Convert to array
  const chartData = Object.entries(iocTypeCounts)
    .map(([name, value]) => ({
      name,
      value,
    }))
    .sort((a, b) => b.value - a.value)

  // If no data, generate mock data
  if (chartData.length === 0) {
    const mockTypes = ["ip", "domain", "url", "file", "email"]
    mockTypes.forEach((type, index) => {
      chartData.push({
        name: type,
        value: 50 - index * 10,
      })
    })
  }

  // Bright, high-contrast colors for better visibility
  const COLORS = [
    "#3B82F6", // bright blue
    "#EC4899", // bright pink
    "#10B981", // bright green
    "#F59E0B", // bright amber
    "#8B5CF6", // bright purple
    "#EF4444", // bright red
    "#06B6D4", // bright cyan
    "#F97316", // bright orange
  ]

  // Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.value, 0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(undefined)
  }

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    )
  }

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">IOC Distribution</CardTitle>
          <Badge variant="outline" className="bg-accent/10 text-xs text-accent">
            By Type
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={70}
                paddingAngle={2}
                dataKey="value"
                labelLine={false}
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={0}
                animationDuration={1000}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                    stroke="hsl(var(--background))"
                    strokeWidth={1}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "4px",
                  fontSize: "12px",
                  color: "#ffffff",
                }}
                formatter={(value, name) => [`${value} (${Math.round((value / total) * 100)}%)`, name]}
                labelStyle={{ color: "#ffffff" }}
              />
              <Legend
                layout="horizontal"
                verticalAlign="bottom"
                align="center"
                formatter={(value) => (
                  <span style={{ fontSize: "10px", color: "#ffffff", fontWeight: "medium" }}>{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
