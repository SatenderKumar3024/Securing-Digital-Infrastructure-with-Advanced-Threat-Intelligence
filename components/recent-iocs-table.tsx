"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Download, Filter, Eye, Bell, Copy, ExternalLink } from "lucide-react"
import type { ThreatData, Indicator } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

export function RecentIOCsTable({ data }: { data: ThreatData }) {
  const [page, setPage] = useState(1)
  const [filteredData, setFilteredData] = useState<Indicator[]>(data?.indicators || [])
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({
    types: [] as string[],
    sources: [] as string[],
    minConfidence: 0,
  })
  const [newIOCs, setNewIOCs] = useState<string[]>([])
  const pageSize = 5
  const totalPages = Math.ceil(filteredData.length / pageSize)

  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

  // Get unique values for filters
  const uniqueTypes = Array.from(new Set(data?.indicators?.map((i) => i.type) || []))
  const uniqueSources = Array.from(new Set(data?.indicators?.map((i) => i.source) || []))

  // Apply filters
  useEffect(() => {
    let result = data?.indicators || []

    if (filters.types.length > 0) {
      result = result.filter((i) => filters.types.includes(i.type))
    }

    if (filters.sources.length > 0) {
      result = result.filter((i) => filters.sources.includes(i.source))
    }

    if (filters.minConfidence > 0) {
      result = result.filter((i) => i.confidence >= filters.minConfidence)
    }

    setFilteredData(result)
    setPage(1)
  }, [filters, data?.indicators])

  // Simulate new IOCs coming in
  useEffect(() => {
    if (!data?.indicators?.length) return

    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        const randomIndex = Math.floor(Math.random() * data.indicators.length)
        const newIoc = data.indicators[randomIndex].indicator
        setNewIOCs((prev) => [...prev, newIoc])

        // Clear notification after 5 seconds
        setTimeout(() => {
          setNewIOCs((prev) => prev.filter((ioc) => ioc !== newIoc))
        }, 5000)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [data?.indicators])

  // Handle filter changes
  const handleTypeFilterChange = (type: string) => {
    setFilters((prev) => {
      const types = prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type]
      return { ...prev, types }
    })
  }

  const handleSourceFilterChange = (source: string) => {
    setFilters((prev) => {
      const sources = prev.sources.includes(source)
        ? prev.sources.filter((s) => s !== source)
        : [...prev.sources, source]
      return { ...prev, sources }
    })
  }

  const handleConfidenceFilterChange = (value: number) => {
    setFilters((prev) => ({ ...prev, minConfidence: value }))
  }

  // Handle copy to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-base font-medium">Recent IOCs</CardTitle>
          {newIOCs.length > 0 && (
            <Badge variant="destructive" className="animate-pulse">
              <Bell className="mr-1 h-3 w-3" />
              {newIOCs.length} new
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <Filter className="h-3.5 w-3.5" />
                <span>Filter</span>
                {(filters.types.length > 0 || filters.sources.length > 0 || filters.minConfidence > 0) && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-center text-xs">
                    {filters.types.length + filters.sources.length + (filters.minConfidence > 0 ? 1 : 0)}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-4">
                <div>
                  <h4 className="mb-2 text-sm font-medium">IOC Types</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueTypes.map((type) => (
                      <div key={type} className="flex items-center space-x-2">
                        <Checkbox
                          id={`type-${type}`}
                          checked={filters.types.includes(type)}
                          onCheckedChange={() => handleTypeFilterChange(type)}
                        />
                        <Label htmlFor={`type-${type}`} className="text-sm">
                          {type}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Sources</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueSources.map((source) => (
                      <div key={source} className="flex items-center space-x-2">
                        <Checkbox
                          id={`source-${source}`}
                          checked={filters.sources.includes(source)}
                          onCheckedChange={() => handleSourceFilterChange(source)}
                        />
                        <Label htmlFor={`source-${source}`} className="text-sm">
                          {source}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="mb-2 text-sm font-medium">Minimum Confidence</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {[0, 25, 50, 75].map((value) => (
                      <Button
                        key={value}
                        variant={filters.minConfidence === value ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleConfidenceFilterChange(value)}
                        className="h-8 text-xs"
                      >
                        {value === 0 ? "Any" : `${value}%+`}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters({ types: [], sources: [], minConfidence: 0 })}
                  >
                    Clear All
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" className="h-8 gap-1">
            <Download className="h-3.5 w-3.5" />
            <span>Export</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Indicator</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Threat Type</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead className="w-[80px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((indicator, index) => (
              <TableRow
                key={index}
                className={newIOCs.includes(indicator.indicator) ? "animate-pulse bg-destructive/10" : ""}
              >
                <TableCell className="font-mono text-xs">
                  <div className="flex items-center gap-1">
                    {indicator.indicator}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => copyToClipboard(indicator.indicator)}
                          >
                            <Copy className="h-3 w-3" />
                            <span className="sr-only">Copy</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy to clipboard</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-normal">
                    {indicator.type}
                  </Badge>
                </TableCell>
                <TableCell>{indicator.threat_type}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={`font-normal ${
                      indicator.source === "OTX" ? "bg-chart-1/10 text-chart-1" : "bg-chart-3/10 text-chart-3"
                    }`}
                  >
                    {indicator.source}
                  </Badge>
                </TableCell>
                <TableCell>{indicator.country}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-16 rounded-full bg-slate-700" aria-hidden="true">
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
                    <span className="text-xs">{indicator.confidence}%</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Eye className="h-3.5 w-3.5" />
                            <span className="sr-only">View details</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <ExternalLink className="h-3.5 w-3.5" />
                            <span className="sr-only">View in source</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View in source</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="mt-4 flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
