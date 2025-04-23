"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart3, Shield, Settings, AlertCircle, Search, Globe, FileText, Users, Bell } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardSidebar() {
  const pathname = usePathname()

  const items = [
    {
      href: "/dashboard",
      icon: BarChart3,
      title: "Dashboard",
    },
    {
      href: "/dashboard/iocs",
      icon: AlertCircle,
      title: "IOCs",
    },
    {
      href: "/dashboard/threat-hunting",
      icon: Search,
      title: "Threat Hunting",
    },
    {
      href: "/dashboard/global-threats",
      icon: Globe,
      title: "Global Threats",
    },
    {
      href: "/dashboard/reports",
      icon: FileText,
      title: "Reports",
    },
    {
      href: "/dashboard/team",
      icon: Users,
      title: "Team",
    },
    {
      href: "/dashboard/alerts",
      icon: Bell,
      title: "Alerts",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
    },
  ]

  return (
    <div className="hidden border-r bg-slate-950/50 lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-cyan-500" />
            <span className="text-lg">SecureInsight</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-cyan-500",
                  pathname === item.href ? "bg-slate-800/50 text-cyan-500" : "hover:bg-slate-800/25",
                )}
              >
                {item.icon && <item.icon className="h-4 w-4" />}
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-cyan-500" />
              <span className="text-xs font-medium">API Status</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">OTX</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">AbuseIPDB</span>
                <span className="flex h-2 w-2 rounded-full bg-green-500" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
