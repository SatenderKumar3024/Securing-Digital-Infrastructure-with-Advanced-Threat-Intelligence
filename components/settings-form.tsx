"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, EyeOff } from "lucide-react"

export function SettingsForm() {
  const [showOTXKey, setShowOTXKey] = useState(false)
  const [showAbuseIPDBKey, setShowAbuseIPDBKey] = useState(false)

  return (
    <Tabs defaultValue="api">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="api">API Configuration</TabsTrigger>
        <TabsTrigger value="display">Display Settings</TabsTrigger>
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
      </TabsList>

      <TabsContent value="api" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>API Keys</CardTitle>
            <CardDescription>Configure your API keys for threat intelligence data sources.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otx-api-key">AlienVault OTX API Key</Label>
              <div className="flex">
                <Input
                  id="otx-api-key"
                  type={showOTXKey ? "text" : "password"}
                  placeholder="Enter your OTX API key"
                  className="flex-1"
                />
                <Button variant="ghost" size="icon" onClick={() => setShowOTXKey(!showOTXKey)} className="ml-2">
                  {showOTXKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showOTXKey ? "Hide" : "Show"} API key</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://otx.alienvault.com/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  AlienVault OTX
                </a>
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="abuseipdb-api-key">AbuseIPDB API Key</Label>
              <div className="flex">
                <Input
                  id="abuseipdb-api-key"
                  type={showAbuseIPDBKey ? "text" : "password"}
                  placeholder="Enter your AbuseIPDB API key"
                  className="flex-1"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowAbuseIPDBKey(!showAbuseIPDBKey)}
                  className="ml-2"
                >
                  {showAbuseIPDBKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  <span className="sr-only">{showAbuseIPDBKey ? "Hide" : "Show"} API key</span>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Get your API key from{" "}
                <a
                  href="https://www.abuseipdb.com/account/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  AbuseIPDB
                </a>
              </p>
            </div>

            <Button className="w-full">Save API Keys</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="display" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Display Settings</CardTitle>
            <CardDescription>Customize how threat intelligence data is displayed.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="refresh-interval">Data Refresh Interval</Label>
              <Select defaultValue="5">
                <SelectTrigger id="refresh-interval">
                  <SelectValue placeholder="Select interval" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 minute</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="60">1 hour</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="chart-type">Default Chart Type</Label>
              <Select defaultValue="bar">
                <SelectTrigger id="chart-type">
                  <SelectValue placeholder="Select chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bar">Bar Chart</SelectItem>
                  <SelectItem value="line">Line Chart</SelectItem>
                  <SelectItem value="pie">Pie Chart</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="auto-refresh">Auto-refresh Data</Label>
              <Switch id="auto-refresh" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="high-contrast">High Contrast Mode</Label>
              <Switch id="high-contrast" />
            </div>

            <Button className="w-full">Save Display Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="notifications" className="mt-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Notification Settings</CardTitle>
            <CardDescription>Configure alerts for critical threat intelligence.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="critical-alerts">Critical Threat Alerts</Label>
              <Switch id="critical-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="new-ioc-alerts">New IOC Alerts</Label>
              <Switch id="new-ioc-alerts" defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="api-status-alerts">API Status Alerts</Label>
              <Switch id="api-status-alerts" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="alert-threshold">Alert Confidence Threshold</Label>
              <Select defaultValue="80">
                <SelectTrigger id="alert-threshold">
                  <SelectValue placeholder="Select threshold" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="50">50%</SelectItem>
                  <SelectItem value="60">60%</SelectItem>
                  <SelectItem value="70">70%</SelectItem>
                  <SelectItem value="80">80%</SelectItem>
                  <SelectItem value="90">90%</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button className="w-full">Save Notification Settings</Button>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
