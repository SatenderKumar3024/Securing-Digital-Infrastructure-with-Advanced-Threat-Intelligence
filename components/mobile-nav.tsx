"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

interface MobileNavProps {
  routes: {
    name: string
    path: string
    exact?: boolean
  }[]
}

export function MobileNav({ routes }: MobileNavProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Function to check if a route is active
  const isRouteActive = (routePath: string, exact?: boolean) => {
    if (exact) {
      return pathname === routePath
    }
    return pathname === routePath || pathname.startsWith(`${routePath}/`)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4">
          {routes.map((route) => (
            <Link
              key={route.path}
              href={route.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-cyan-500",
                isRouteActive(route.path, route.exact) ? "text-cyan-500" : "text-muted-foreground",
              )}
              onClick={() => setOpen(false)}
            >
              {route.name}
            </Link>
          ))}
          <Button asChild className="mt-4 bg-cyan-600 hover:bg-cyan-700">
            <Link href="/contact" onClick={() => setOpen(false)}>
              Get In Touch
            </Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
