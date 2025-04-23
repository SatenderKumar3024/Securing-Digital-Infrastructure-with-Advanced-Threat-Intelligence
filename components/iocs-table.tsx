"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Filter, Search, X, FileDown, Eye } from "lucide-react"
import type { ThreatData, Indicator } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function IOCsTable({ data }: { data: ThreatData }) {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")
  const [showFilters, setShowFilters] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])
  const [filters, setFilters] = useState({
    types: [] as string[],
    countries: [] as string[],
    sources: [] as string[],
    minConfidence: 0,
    timeRange: "all" as "all" | "24h" | "7d" | "30d",
  })
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator | undefined>(undefined)
  const pageSize = 10

  // Ensure data.indicators exists before filtering
  const indicators = data?.indicators || []

  // Get unique values for filters
  const uniqueTypes = Array.from(new Set(indicators.map((i) => i.type)))
  const uniqueCountries = Array.from(new Set(indicators.map((i) => i.country)))
  const uniqueSources = Array.from(new Set(indicators.map((i) => i.source)))

  // Filter data based on search and filters
  const filteredData = indicators.filter((indicator) => {
    // Search filter
    const matchesSearch =
      search === "" ||
      indicator.indicator.toLowerCase().includes(search.toLowerCase()) ||
      indicator.type.toLowerCase().includes(search.toLowerCase()) ||
      indicator.threat_type.toLowerCase().includes(search.toLowerCase()) ||
      indicator.country.toLowerCase().includes(search.toLowerCase())

    // Type filter
    const matchesType = filters.types.length === 0 || filters.types.includes(indicator.type)

    // Country filter
    const matchesCountry = filters.countries.length === 0 || filters.countries.includes(indicator.country)

    // Source filter
    const matchesSource = filters.sources.length === 0 || filters.sources.includes(indicator.source)

    // Confidence filter
    const matchesConfidence = indicator.confidence >= filters.minConfidence

    // Time range filter
    let matchesTimeRange = true
    if (filters.timeRange !== "all") {
      const now = new Date()
      const timestamp = new Date(indicator.timestamp)
      const cutoff = new Date()

      switch (filters.timeRange) {
        case "24h":
          cutoff.setDate(now.getDate() - 1)
          break
        case "7d":
          cutoff.setDate(now.getDate() - 7)
          break
        case "30d":
          cutoff.setDate(now.getDate() - 30)
          break
      }

      matchesTimeRange = timestamp >= cutoff
    }

    return matchesSearch && matchesType && matchesCountry && matchesSource && matchesConfidence && matchesTimeRange
  })

  const totalPages = Math.ceil(filteredData.length / pageSize)
  const paginatedData = filteredData.slice((page - 1) * pageSize, page * pageSize)

  // Update active filters count
  useEffect(() => {
    const newActiveFilters: string[] = []

    if (filters.types.length > 0) newActiveFilters.push(`Types (${filters.types.length})`)
    if (filters.countries.length > 0) newActiveFilters.push(`Countries (${filters.countries.length})`)
    if (filters.sources.length > 0) newActiveFilters.push(`Sources (${filters.sources.length})`)
    if (filters.minConfidence > 0) newActiveFilters.push(`Confidence (${filters.minConfidence}%+)`)
    if (filters.timeRange !== "all") newActiveFilters.push(`Time (${filters.timeRange})`)

    setActiveFilters(newActiveFilters)
  }, [filters])

  // Handle filter changes
  const handleTypeFilterChange = (type: string) => {
    setFilters((prev) => {
      const types = prev.types.includes(type) ? prev.types.filter((t) => t !== type) : [...prev.types, type]
      return { ...prev, types }
    })
  }

  const handleCountryFilterChange = (country: string) => {
    setFilters((prev) => {
      const countries = prev.countries.includes(country)
        ? prev.countries.filter((c) => c !== country)
        : [...prev.countries, country]
      return { ...prev, countries }
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

  const handleConfidenceFilterChange = (value: number[]) => {
    setFilters((prev) => ({ ...prev, minConfidence: value[0] }))
  }

  const handleTimeRangeChange = (value: string) => {
    setFilters((prev) => ({ ...prev, timeRange: value as "all" | "24h" | "7d" | "30d" }))
  }

  const clearAllFilters = () => {
    setFilters({
      types: [],
      countries: [],
      sources: [],
      minConfidence: 0,
      timeRange: "all",
    })
    setSearch("")
  }

  const exportData = () => {
    // Create CSV content
    const headers = ["Indicator", "Type", "Threat Type", "Source", "Timestamp", "Country", "Confidence"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map((indicator) =>
        [
          `"${indicator.indicator}"`,
          indicator.type,
          indicator.threat_type,
          indicator.source,
          new Date(indicator.timestamp).toISOString(),
          indicator.country,
          indicator.confidence,
        ].join(","),
      ),
    ].join("\n")

    // Create download link
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.setAttribute("href", url)
    link.setAttribute("download", `threat-iocs-export-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Handle indicator selection
  const handleIndicatorClick = (indicator: Indicator) => {
    setSelectedIndicator(indicator)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex w-full max-w-sm items-center gap-2">
          <Input
            type="search"
            placeholder="Search IOCs..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className="h-9"
          />
          <Button variant="ghost" size="sm" className="h-9 px-2">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Popover open={showFilters} onOpenChange={setShowFilters}>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className="h-9 gap-1">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {activeFilters.length > 0 && (
                  <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-center text-xs">
                    {activeFilters.length}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-0" align="end">
              <Tabs defaultValue="types">
                <div className="border-b px-3 py-2">
                  <h4 className="text-sm font-medium">Filter IOCs</h4>
                </div>
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="types">Types</TabsTrigger>
                  <TabsTrigger value="countries">Countries</TabsTrigger>
                  <TabsTrigger value="sources">Sources</TabsTrigger>
                  <TabsTrigger value="advanced">Advanced</TabsTrigger>
                </TabsList>

                <TabsContent value="types" className="p-4">
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
                </TabsContent>

                <TabsContent value="countries" className="max-h-[300px] overflow-y-auto p-4">
                  <div className="grid grid-cols-2 gap-2">
                    {uniqueCountries.map((country) => (
                      <div key={country} className="flex items-center space-x-2">
                        <Checkbox
                          id={`country-${country}`}
                          checked={filters.countries.includes(country)}
                          onCheckedChange={() => handleCountryFilterChange(country)}
                        />
                        <Label htmlFor={`country-${country}`} className="text-sm">
                          {country}
                        </Label>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="p-4">
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
                </TabsContent>

                <TabsContent value="advanced" className="space-y-4 p-4">
                  <div>
                    <Label htmlFor="confidence-slider" className="text-sm font-medium">
                      Minimum Confidence: {filters.minConfidence}%
                    </Label>
                    <Slider
                      id="confidence-slider"
                      defaultValue={[filters.minConfidence]}
                      max={100}
                      step={5}
                      onValueChange={handleConfidenceFilterChange}
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time-range" className="text-sm font-medium">
                      Time Range
                    </Label>
                    <Select value={filters.timeRange} onValueChange={handleTimeRangeChange}>
                      <SelectTrigger id="time-range" className="mt-2">
                        <SelectValue placeholder="Select time range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="24h">Last 24 Hours</SelectItem>
                        <SelectItem value="7d">Last 7 Days</SelectItem>
                        <SelectItem value="30d">Last 30 Days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <div className="flex items-center justify-between border-t p-4">
                  <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                    Clear All
                  </Button>
                  <Button size="sm" onClick={() => setShowFilters(false)}>
                    Apply Filters
                  </Button>
                </div>
              </Tabs>
            </PopoverContent>
          </Popover>

          <Button variant="outline" size="sm" className="h-9 gap-1" onClick={exportData}>
            <FileDown className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
              <X
                className="h-3 w-3 cursor-pointer"
                onClick={() => {
                  // Extract filter type from the badge text
                  if (filter.startsWith("Types")) setFilters((prev) => ({ ...prev, types: [] }))
                  if (filter.startsWith("Countries")) setFilters((prev) => ({ ...prev, countries: [] }))
                  if (filter.startsWith("Sources")) setFilters((prev) => ({ ...prev, sources: [] }))
                  if (filter.startsWith("Confidence")) setFilters((prev) => ({ ...prev, minConfidence: 0 }))
                  if (filter.startsWith("Time")) setFilters((prev) => ({ ...prev, timeRange: "all" }))
                }}
              />
            </Badge>
          ))}
          <Button variant="ghost" size="sm" className="h-7 px-2 text-xs" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      )}

      {selectedIndicator ? (
        <div className="rounded-lg border bg-card p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">Threat Details</h3>
            <Button variant="ghost" size="sm" onClick={() => setSelectedIndicator(undefined)}>
              Close
            </Button>
          </div>

          <div className="space-y-4">
            <div className="grid gap-2 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Indicator</p>
                <p className="font-mono">{selectedIndicator.indicator}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Type</p>
                <Badge variant="outline">{selectedIndicator.type}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Threat Type</p>
                <p>{selectedIndicator.threat_type}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Source</p>
                <Badge variant="outline">{selectedIndicator.source}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Country</p>
                <Badge variant="outline">{selectedIndicator.country}</Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Confidence</p>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-16 rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className={`h-full rounded-full ${
                        selectedIndicator.confidence > 80
                          ? "bg-red-500"
                          : selectedIndicator.confidence > 50
                            ? "bg-orange-500"
                            : "bg-yellow-500"
                      }`}
                      style={{ width: `${selectedIndicator.confidence}%` }}
                    />
                  </div>
                  <span>{selectedIndicator.confidence}%</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Timestamp</p>
                <p>{new Date(selectedIndicator.timestamp).toLocaleString()}</p>
              </div>
            </div>

            <div className="rounded-md bg-muted p-4">
              <h4 className="mb-2 font-medium">Recommended Actions</h4>
              <ul className="list-inside list-disc space-y-1 text-sm">
                <li>Add to blocklist in firewall</li>
                <li>Scan systems for this indicator</li>
                <li>Check logs for previous occurrences</li>
                <li>Share with security team</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <Card className="border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Indicator</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Threat Type</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((indicator, index) => (
                    <TableRow key={index} className="hover:bg-slate-800/50">
                      <TableCell className="font-mono text-xs">{indicator.indicator}</TableCell>
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
                            indicator.source === "OTX"
                              ? "bg-blue-500/10 text-blue-500"
                              : "bg-green-500/10 text-green-500"
                          }`}
                        >
                          {indicator.source}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-xs">{new Date(indicator.timestamp).toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-500/10 font-normal text-purple-500">
                          {indicator.country}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-slate-700" aria-hidden="true">
                            <div
                              className={`h-full rounded-full ${
                                indicator.confidence > 80
                                  ? "bg-red-500"
                                  : indicator.confidence > 50
                                    ? "bg-orange-500"
                                    : "bg-yellow-500"
                              }`}
                              style={{ width: `${indicator.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs">{indicator.confidence}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => handleIndicatorClick(indicator)}
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span className="sr-only">View details</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={8} className="h-24 text-center">
                      No results found. Try adjusting your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {paginatedData.length} of {filteredData.length} IOCs
        </p>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm">
            Page {page} of {totalPages || 1}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages || totalPages === 0}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
