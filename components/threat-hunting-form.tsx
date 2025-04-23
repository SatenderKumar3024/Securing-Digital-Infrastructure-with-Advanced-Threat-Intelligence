"use client"

import { useState } from "react"
import { Search, AlertCircle, Download, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { IOCType } from "@/lib/types"

export function ThreatHuntingForm() {
  const [searchMode, setSearchMode] = useState<"single" | "batch">("single")
  const [searchType, setSearchType] = useState<IOCType>("ip")
  const [searchValue, setSearchValue] = useState("")
  const [batchValues, setBatchValues] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sources, setSources] = useState({
    otx: true,
    abuseipdb: true,
    virustotal: false,
    threatfox: false,
  })

  const handleSearch = async () => {
    setIsSearching(true)
    setError(null)
    setSearchResults(null)

    try {
      // Simulate API call with timeout
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock results
      if (searchMode === "single") {
        setSearchResults([
          {
            id: "1",
            value: searchValue,
            type: searchType,
            source: "OTX",
            confidence: 85,
            firstSeen: "2023-10-15",
            lastSeen: "2023-11-02",
            tags: ["malware", "ransomware", "botnet"],
            country: "Russia",
            description: "Associated with Emotet malware campaign",
          },
        ])
      } else {
        // For batch mode, generate mock results for each line
        const values = batchValues.split("\n").filter((v) => v.trim())
        setSearchResults(
          values.map((v, i) => ({
            id: `batch-${i}`,
            value: v.trim(),
            type: searchType,
            source: i % 2 === 0 ? "OTX" : "AbuseIPDB",
            confidence: Math.floor(Math.random() * 40) + 60,
            firstSeen: "2023-09-05",
            lastSeen: "2023-11-10",
            tags: ["suspicious", i % 3 === 0 ? "phishing" : "malware"],
            country: i % 3 === 0 ? "China" : i % 2 === 0 ? "Russia" : "North Korea",
            description: `Potential threat indicator related to ${i % 2 === 0 ? "phishing campaign" : "malware distribution"}`,
          })),
        )
      }
    } catch (err) {
      setError("An error occurred while searching. Please try again.")
      console.error(err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleClear = () => {
    setSearchValue("")
    setBatchValues("")
    setSearchResults(null)
    setError(null)
  }

  const handleExport = () => {
    if (!searchResults) return

    // Create CSV content
    const headers = "Value,Type,Source,Confidence,First Seen,Last Seen,Country,Tags,Description\n"
    const rows = searchResults
      .map(
        (result) =>
          `"${result.value}","${result.type}","${result.source}",${result.confidence},"${result.firstSeen}","${result.lastSeen}","${result.country}","${result.tags.join(", ")}","${result.description}"`,
      )
      .join("\n")

    const csvContent = `data:text/csv;charset=utf-8,${headers}${rows}`

    // Create download link
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `threat-hunt-results-${new Date().toISOString().slice(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Threat Hunting</CardTitle>
          <CardDescription>
            Search for indicators of compromise across multiple threat intelligence sources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={searchMode} onValueChange={(v) => setSearchMode(v as "single" | "batch")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="single">Single Search</TabsTrigger>
              <TabsTrigger value="batch">Batch Search</TabsTrigger>
            </TabsList>

            <TabsContent value="single" className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-1/4">
                  <Select value={searchType} onValueChange={(v) => setSearchType(v as IOCType)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ip">IP Address</SelectItem>
                      <SelectItem value="domain">Domain</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="hash">File Hash</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder={`Enter ${searchType === "ip" ? "IP address" : searchType === "domain" ? "domain name" : searchType === "url" ? "URL" : searchType === "hash" ? "file hash" : "email address"}`}
                      className="pl-9"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="batch" className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="batch-input">Enter multiple indicators (one per line)</Label>
                  <Select value={searchType} onValueChange={(v) => setSearchType(v as IOCType)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ip">IP Address</SelectItem>
                      <SelectItem value="domain">Domain</SelectItem>
                      <SelectItem value="url">URL</SelectItem>
                      <SelectItem value="hash">File Hash</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Textarea
                  id="batch-input"
                  placeholder={`Enter multiple ${searchType}s, one per line`}
                  className="min-h-[150px]"
                  value={batchValues}
                  onChange={(e) => setBatchValues(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 space-y-4">
            <div className="space-y-2">
              <Label>Intelligence Sources</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="source-otx"
                    checked={sources.otx}
                    onCheckedChange={(checked) => setSources({ ...sources, otx: checked === true })}
                  />
                  <Label htmlFor="source-otx">AlienVault OTX</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="source-abuseipdb"
                    checked={sources.abuseipdb}
                    onCheckedChange={(checked) => setSources({ ...sources, abuseipdb: checked === true })}
                  />
                  <Label htmlFor="source-abuseipdb">AbuseIPDB</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="source-virustotal"
                    checked={sources.virustotal}
                    onCheckedChange={(checked) => setSources({ ...sources, virustotal: checked === true })}
                  />
                  <Label htmlFor="source-virustotal">VirusTotal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="source-threatfox"
                    checked={sources.threatfox}
                    onCheckedChange={(checked) => setSources({ ...sources, threatfox: checked === true })}
                  />
                  <Label htmlFor="source-threatfox">ThreatFox</Label>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleClear}>
            Clear
          </Button>
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {searchResults && searchResults.length > 0 && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Search Results</CardTitle>
              <CardDescription>
                Found {searchResults.length} {searchResults.length === 1 ? "result" : "results"}
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {searchResults.map((result) => (
                <div key={result.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          result.confidence > 80 ? "destructive" : result.confidence > 60 ? "warning" : "outline"
                        }
                      >
                        {result.confidence}% Confidence
                      </Badge>
                      <span className="text-sm text-muted-foreground">Source: {result.source}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {result.tags.map((tag: string) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium">{result.value}</h4>
                    <p className="text-sm text-muted-foreground">{result.description}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Type:</span> {result.type}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Country:</span> {result.country}
                    </div>
                    <div>
                      <span className="text-muted-foreground">First Seen:</span> {result.firstSeen}
                    </div>
                    <div>
                      <span className="text-muted-foreground">Last Seen:</span> {result.lastSeen}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {searchResults && searchResults.length === 0 && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>No results found</AlertTitle>
          <AlertDescription>
            No threat intelligence was found for your search criteria. Try broadening your search or checking different
            sources.
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
}
