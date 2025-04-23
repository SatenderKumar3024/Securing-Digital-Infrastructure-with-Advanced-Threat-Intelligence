// Mock environment variables when they're not available
export function getEnvVariable(name: string, defaultValue = ""): string {
  // Check if we're in a browser environment
  if (typeof window !== "undefined") {
    // For client-side, return a mock value
    return getMockValue(name)
  }

  // For server-side, try to get the actual environment variable
  const value = process.env[name]
  if (!value) {
    console.warn(`Environment variable ${name} not found, using mock value`)
    return getMockValue(name)
  }

  return value
}

function getMockValue(name: string): string {
  switch (name) {
    case "OTX_API_KEY":
      return "mock-otx-api-key-for-development"
    case "ABUSEIPDB_API_KEY":
      return "mock-abuseipdb-api-key-for-development"
    default:
      return `mock-${name.toLowerCase()}-value`
  }
}
