"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      name: "Overview",
      path: "/",
      exact: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      exact: false,
    },
    {
      name: "Research",
      path: "/research",
      exact: false,
    },
    {
      name: "Security",
      path: "/projects",
      exact: false,
    },
    {
      name: "Contact",
      path: "/contact",
      exact: false,
    },
  ]

  // Function to check if a route is active
  const isRouteActive = (routePath: string, exact: boolean) => {
    if (exact) {
      return pathname === routePath
    }
    return pathname === routePath || pathname.startsWith(`${routePath}/`)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-slate-950/80 backdrop-blur-sm">
      <div className="container flex h-16 items-center px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-cyan-500" />
          <span className="text-lg">Satender Kumar</span>
        </Link>
        <nav className="ml-auto hidden gap-6 md:flex">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-500",
                isRouteActive(route.path, route.exact) ? "text-cyan-500" : "text-muted-foreground",
              )}
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <div className="ml-auto md:hidden">
          <MobileNav routes={routes} />
        </div>
        <div className="ml-4 hidden md:block">
          <Button asChild variant="default" className="bg-cyan-600 hover:bg-cyan-700">
            <Link href="/contact">Get In Touch</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
