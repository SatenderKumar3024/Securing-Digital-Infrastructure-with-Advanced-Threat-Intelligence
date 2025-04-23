"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, RefreshCw, Bell, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function Navbar() {
  const [isSearching, setIsSearching] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="flex flex-1 items-center gap-2">
        {isSearching ? (
          <div className="flex w-full max-w-sm items-center gap-2">
            <Input
              type="search"
              placeholder="Search for IOCs..."
              className="h-8 w-full"
              autoFocus
              onBlur={() => setIsSearching(false)}
            />
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSearching(false)}>
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </div>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSearching(true)}>
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        )}
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <RefreshCw className="h-4 w-4" />
          <span className="sr-only">Refresh</span>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notifications</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </header>
  )
}
