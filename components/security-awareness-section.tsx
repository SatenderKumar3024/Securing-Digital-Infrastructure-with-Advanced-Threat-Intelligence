"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertTriangle, Shield, Lock, Fingerprint } from "lucide-react"

export function SecurityAwarenessSection() {
  const [consentChoice, setConsentChoice] = useState<string | null>(null)
  const [scanStatus, setScanStatus] = useState<"ready" | "scanning" | "complete">("ready")

  const handleScan = () => {
    setScanStatus("scanning")
    setTimeout(() => {
      setScanStatus("complete")
    }, 2000)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Security Awareness</h2>
          <p className="mt-4 text-xl text-muted-foreground">Interactive security features and awareness components</p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>GDPR Consent Simulation</CardTitle>
              <CardDescription>Demonstration of proper consent collection</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <p className="text-sm">
                  This website collects personal data to enhance your experience. We process your data in accordance
                  with our Privacy Policy.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button
                    variant={consentChoice === "all" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConsentChoice("all")}
                  >
                    Accept All
                  </Button>
                  <Button
                    variant={consentChoice === "essential" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setConsentChoice("essential")}
                  >
                    Essential Only
                  </Button>
                </div>
                {consentChoice && (
                  <div className="mt-4 text-xs text-muted-foreground">
                    <p>Compliant with GDPR Article 7: Conditions for consent</p>
                    <p>Implements Privacy by Design principles</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Access Badge</CardTitle>
              <CardDescription>Visual representation of security status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    <Shield className="mr-1 h-3 w-3" />
                    Zero Trust Verified
                  </Badge>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  All access is authenticated, authorized, and encrypted
                </p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Authentication</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      MFA Enabled
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Authorization</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      Least Privilege
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Encryption</span>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500">
                      TLS 1.3
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Security Scan Status</CardTitle>
              <CardDescription>Real-time security scanning simulation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border bg-card p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {scanStatus === "ready" && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                    {scanStatus === "scanning" && <AlertTriangle className="h-5 w-5 animate-pulse text-amber-500" />}
                    {scanStatus === "complete" && <CheckCircle className="h-5 w-5 text-green-500" />}
                    <span className="font-medium">
                      {scanStatus === "ready" && "Ready to Scan"}
                      {scanStatus === "scanning" && "Scanning..."}
                      {scanStatus === "complete" && "Scan Complete"}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" onClick={handleScan} disabled={scanStatus === "scanning"}>
                    {scanStatus === "ready" ? "Scan Now" : scanStatus === "scanning" ? "Scanning..." : "Scan Again"}
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">AWS IAM Policies</span>
                      {scanStatus === "complete" ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Secure
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Azure RBAC Assignments</span>
                      {scanStatus === "complete" ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Secure
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">S3 Bucket Policies</span>
                      {scanStatus === "complete" ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Secure
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Phishing Protection</span>
                      {scanStatus === "complete" ? (
                        <Badge variant="outline" className="bg-green-500/10 text-green-500">
                          Secure
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-slate-500/10 text-slate-500">
                          Pending
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
