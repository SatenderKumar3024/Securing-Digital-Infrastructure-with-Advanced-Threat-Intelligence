import type { ThreatData } from "./types"

// This function would normally fetch data from the API routes
// For demo purposes, we'll return mock data
export async function fetchThreatData(): Promise<ThreatData> {
  // In a real implementation, you would fetch from the API routes
  // const otxResponse = await fetch('/api/otx')
  // const otxData = await otxResponse.json()

  // const abuseipdbResponse = await fetch('/api/abuseipdb')
  // const abuseipdbData = await abuseipdbResponse.json()

  // return {
  //   indicators: [...otxData.indicators, ...abuseipdbData.indicators]
  // }

  // For demo purposes, return mock data
  return {
    indicators: generateMockIndicators(200), // Increased from 100 to 200
  }
}

function generateMockIndicators(count: number) {
  const indicators = []
  const types = ["ip", "domain", "url", "file", "email"]
  const threatTypes = ["Malware", "Phishing", "C2", "Ransomware", "Botnet", "Spam", "Scanning"]
  const countries = ["US", "RU", "CN", "BR", "IN", "GB", "DE", "FR", "JP", "AU", "CA", "IT", "ES", "NL", "SE"]
  const sources = ["OTX", "AbuseIPDB"]

  // Common malware names
  const malwareNames = ["Emotet", "TrickBot", "Ryuk", "Conti", "Qakbot", "Dridex", "Lokibot", "AgentTesla"]

  // Generate random indicators
  for (let i = 0; i < count; i++) {
    const type = types[Math.floor(Math.random() * types.length)]
    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
    const country = countries[Math.floor(Math.random() * countries.length)]
    const source = sources[Math.floor(Math.random() * sources.length)]
    const confidence = Math.floor(Math.random() * 100)

    // Generate a random timestamp within the last 30 days
    const timestamp = new Date()
    timestamp.setDate(timestamp.getDate() - Math.floor(Math.random() * 30))
    // Add hours, minutes, seconds for more varied timestamps
    timestamp.setHours(Math.floor(Math.random() * 24))
    timestamp.setMinutes(Math.floor(Math.random() * 60))
    timestamp.setSeconds(Math.floor(Math.random() * 60))

    // Generate indicator based on type
    let indicator
    switch (type) {
      case "ip":
        indicator = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`
        break
      case "domain":
        indicator = `${getRandomString(8)}.${["com", "net", "org", "io"][Math.floor(Math.random() * 4)]}`
        break
      case "url":
        indicator = `https://${getRandomString(8)}.${["com", "net", "org", "io"][Math.floor(Math.random() * 4)]}/path/${getRandomString(5)}`
        break
      case "file":
        indicator = `${getRandomString(32)}.${["exe", "dll", "js", "pdf"][Math.floor(Math.random() * 4)]}`
        break
      case "email":
        indicator = `${getRandomString(8)}@${getRandomString(6)}.${["com", "net", "org"][Math.floor(Math.random() * 3)]}`
        break
      default:
        indicator = getRandomString(16)
    }

    // Add specific malware name to threat type if it's malware
    if (threatType === "Malware") {
      const malwareName = malwareNames[Math.floor(Math.random() * malwareNames.length)]
      indicators.push({
        indicator,
        type,
        threat_type: `${threatType} (${malwareName})`,
        timestamp: timestamp.toISOString(),
        country,
        confidence,
        source,
      })
    } else {
      indicators.push({
        indicator,
        type,
        threat_type: threatType,
        timestamp: timestamp.toISOString(),
        country,
        confidence,
        source,
      })
    }
  }

  return indicators
}

// Helper function to generate random strings
function getRandomString(length: number) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789"
  let result = ""
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return result
}
