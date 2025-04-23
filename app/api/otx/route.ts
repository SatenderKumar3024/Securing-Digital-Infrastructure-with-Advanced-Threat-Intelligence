import { NextResponse } from "next/server"
import { getEnvVariable } from "@/lib/env"

export async function GET() {
  try {
    // Use the getEnvVariable function to get the API key
    const apiKey = getEnvVariable("OTX_API_KEY")

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // For development, return mock data if using a mock API key
    if (apiKey.startsWith("mock-")) {
      return NextResponse.json({
        results: generateMockOTXData(),
      })
    }

    const response = await fetch("https://otx.alienvault.com/api/v1/pulses/subscribed", {
      headers: {
        "X-OTX-API-KEY": apiKey,
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from OTX API" }, { status: response.status })
    }

    const data = await response.json()

    // Process and normalize the data
    const normalizedData = processOTXData(data)

    return NextResponse.json(normalizedData)
  } catch (error) {
    console.error("OTX API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function processOTXData(data: any) {
  // In a real implementation, this would normalize the OTX data format
  // to match our unified schema

  // For demo purposes, we'll return mock data
  return {
    indicators:
      data.results?.flatMap((pulse: any) =>
        pulse.indicators?.map((indicator: any) => ({
          indicator: indicator.indicator,
          type: indicator.type,
          threat_type: pulse.name,
          timestamp: indicator.created,
          country: indicator.country || "Unknown",
          confidence: Math.floor(Math.random() * 100),
          source: "OTX",
        })),
      ) || [],
  }
}

function generateMockOTXData() {
  // Generate mock pulses
  const pulses = []
  const threatTypes = ["Malware", "Phishing", "C2", "Ransomware", "Botnet", "Spam", "Scanning"]
  const countries = ["US", "RU", "CN", "BR", "IN", "GB", "DE", "FR", "JP", "AU", "CA"]

  for (let i = 0; i < 5; i++) {
    const indicators = []
    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]

    for (let j = 0; j < 10; j++) {
      indicators.push({
        indicator: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
        type: "IPv4",
        created: new Date().toISOString(),
        country: countries[Math.floor(Math.random() * countries.length)],
      })
    }

    pulses.push({
      name: threatType,
      indicators: indicators,
    })
  }

  return pulses
}
