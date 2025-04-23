"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { AlertTriangle, ShieldAlert, Globe, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
  iconColor: string
  isRealTime?: boolean
}

function StatCard({ title, value, change, icon: Icon, iconColor, isRealTime = false }: StatCardProps) {
  const [currentValue, setCurrentValue] = useState(value)
  const [isUpdating, setIsUpdating] = useState(false)

  // Simulate real-time updates for the "Active Threats" card
  useEffect(() => {
    if (!isRealTime) return

    const interval = setInterval(() => {
      // Randomly decide if we should update the value
      if (Math.random() > 0.7) {
        setIsUpdating(true)

        // Generate a random change between -5 and +10
        const changeAmount = Math.floor(Math.random() * 16) - 5
        const currentNumericValue = Number.parseInt(currentValue.replace(/,/g, ""))
        const newValue = Math.max(0, currentNumericValue + changeAmount)

        // Format with commas
        const formattedValue = newValue.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

        setTimeout(() => {
          setCurrentValue(formattedValue)
          setIsUpdating(false)
        }, 500)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [currentValue, isRealTime])

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className={`text-2xl font-bold ${isUpdating ? "animate-pulse text-accent" : ""}`}>
                {currentValue}
                {isRealTime && (
                  <Badge variant="outline" className="ml-2 bg-accent/10 text-xs text-accent">
                    LIVE
                  </Badge>
                )}
              </p>
              {change && (
                <p className={`text-xs ${change.startsWith("+") ? "text-chart-4" : "text-destructive"}`}>{change}</p>
              )}
            </div>
          </div>
          <div className={`rounded-full p-3 ${iconColor} bg-background/10`}>
            <Icon className="h-6 w-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function DashboardHeader() {
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  // Update the "last updated" time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date())
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-4">
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Threat Intelligence Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time overview of global cyber threats and indicators of compromise.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-muted-foreground">
          <span>Last updated:</span>
          <span className="font-mono text-accent">{lastUpdated.toLocaleTimeString()}</span>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-chart-4 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-chart-4"></span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Active Threats"
          value="3,498"
          change="+12%"
          icon={AlertTriangle}
          iconColor="text-threat-high"
          isRealTime={true}
        />
        <StatCard
          title="Critical IOCs"
          value="1,000"
          change="+10%"
          icon={ShieldAlert}
          iconColor="text-threat-critical"
        />
        <StatCard title="Countries" value="52" change="-3%" icon={Globe} iconColor="text-accent" />
        <StatCard title="Refresh Rate" value="5 min" change="" icon={Zap} iconColor="text-chart-4" />
      </div>
    </div>
  )
}
