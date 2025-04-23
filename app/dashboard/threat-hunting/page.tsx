import type { Metadata } from "next"
import { ThreatHuntingForm } from "@/components/threat-hunting-form"

export const metadata: Metadata = {
  title: "Threat Hunting | Cybersecurity Dashboard",
  description: "Search for indicators of compromise across multiple threat intelligence sources",
}

export default function ThreatHuntingPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Threat Hunting</h2>
      </div>
      <div className="grid gap-4">
        <ThreatHuntingForm />
      </div>
    </div>
  )
}
