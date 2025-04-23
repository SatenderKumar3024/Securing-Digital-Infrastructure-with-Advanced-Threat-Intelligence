"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { LayoutDashboard, AlertTriangle, Settings, Shield, Database } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },
    {
      name: "IOCs",
      path: "/iocs",
      icon: AlertTriangle,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ]

  return (
    <div className="hidden border-r bg-slate-950/50 lg:block lg:w-64">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-cyan-500" />
            <span className="text-lg">ThreatIntel</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium">
            {routes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary",
                  pathname === route.path && "bg-slate-800/50 text-primary",
                )}
              >
                <route.icon className="h-4 w-4" />
                {route.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <div className="mb-2 flex items-center gap-2">
              <Database className="h-4 w-4 text-cyan-500" />
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
