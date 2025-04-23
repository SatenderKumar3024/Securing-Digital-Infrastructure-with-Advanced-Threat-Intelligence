import { NextResponse } from "next/server"
import { getEnvVariable } from "@/lib/env"

export async function GET() {
  try {
    // Use the getEnvVariable function to get the API key
    const apiKey = getEnvVariable("ABUSEIPDB_API_KEY")

    if (!apiKey) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // For development, return mock data if using a mock API key
    if (apiKey.startsWith("mock-")) {
      return NextResponse.json({
        data: generateMockAbuseIPDBData(),
      })
    }

    const response = await fetch("https://api.abuseipdb.com/api/v2/blacklist?limit=100&confidenceMinimum=90", {
      headers: {
        Key: apiKey,
        Accept: "application/json",
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch from AbuseIPDB API" }, { status: response.status })
    }

    const data = await response.json()

    // Process and normalize the data
    const normalizedData = processAbuseIPDBData(data)

    return NextResponse.json(normalizedData)
  } catch (error) {
    console.error("AbuseIPDB API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

function processAbuseIPDBData(data: any) {
  // In a real implementation, this would normalize the AbuseIPDB data format
  // to match our unified schema

  // For demo purposes, we'll return mock data
  return {
    indicators:
      data.data?.map((item: any) => ({
        indicator: item.ipAddress,
        type: "ip",
        threat_type: mapCategoryToThreatType(item.abuseConfidenceScore),
        timestamp: new Date().toISOString(),
        country: item.countryCode || "Unknown",
        confidence: item.abuseConfidenceScore,
        source: "AbuseIPDB",
      })) || [],
  }
}

function mapCategoryToThreatType(confidence: number) {
  // Map confidence score to a threat type
  if (confidence > 90) return "High Risk"
  if (confidence > 70) return "Medium Risk"
  return "Low Risk"
}

function generateMockAbuseIPDBData() {
  // Generate mock data
  const mockData = []
  const countries = ["US", "RU", "CN", "BR", "IN", "GB", "DE", "FR", "JP", "AU", "CA"]

  for (let i = 0; i < 50; i++) {
    mockData.push({
      ipAddress: `192.168.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
      countryCode: countries[Math.floor(Math.random() * countries.length)],
      abuseConfidenceScore: Math.floor(Math.random() * 100),
    })
  }

  return mockData
}
