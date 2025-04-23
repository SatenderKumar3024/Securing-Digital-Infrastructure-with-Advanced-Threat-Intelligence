export type IOCType = "ip" | "domain" | "url" | "hash" | "email"

export interface Indicator {
  indicator: string
  type: string
  threat_type: string
  timestamp: string
  country: string
  confidence: number
  source: string
}

export interface ThreatData {
  indicators: Indicator[]
}
