"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import type { ThreatData } from "@/lib/types"

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json"

export function ThreatMap({ data }: { data: ThreatData }) {
  const [tooltipContent, setTooltipContent] = useState("")

  // Group threats by country
  const threatsByCountry = data.indicators.reduce(
    (acc, indicator) => {
      const country = indicator.country
      if (!acc[country]) {
        acc[country] = []
      }
      acc[country].push(indicator)
      return acc
    },
    {} as Record<string, typeof data.indicators>,
  )

  // Get country coordinates (simplified for demo)
  const countryCoordinates: Record<string, [number, number]> = {
    US: [-95.7129, 37.0902],
    RU: [105.3188, 61.524],
    CN: [104.1954, 35.8617],
    BR: [-51.9253, -14.235],
    IN: [78.9629, 20.5937],
    GB: [-3.4359, 55.3781],
    DE: [10.4515, 51.1657],
    FR: [2.2137, 46.2276],
    JP: [138.2529, 36.2048],
    AU: [133.7751, -25.2744],
    // Add more countries as needed
  }

  // Calculate threat intensity for color scale
  const getCountryColor = (countryCode: string) => {
    const threats = threatsByCountry[countryCode] || []
    const threatCount = threats.length

    if (threatCount === 0) return "#2C3440"
    if (threatCount < 5) return "#2563EB"
    if (threatCount < 15) return "#9333EA"
    if (threatCount < 30) return "#DB2777"
    return "#DC2626"
  }

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Global Threat Map</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-[400px] w-full">
          <ComposableMap
            projectionConfig={{
              scale: 147,
            }}
          >
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => {
                  const countryCode = geo.properties.iso_a2
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(countryCode)}
                      stroke="#1F2937"
                      strokeWidth={0.5}
                      onMouseEnter={() => {
                        const threats = threatsByCountry[countryCode] || []
                        setTooltipContent(`${geo.properties.name}: ${threats.length} threats`)
                      }}
                      onMouseLeave={() => {
                        setTooltipContent("")
                      }}
                      style={{
                        default: {
                          outline: "none",
                        },
                        hover: {
                          outline: "none",
                          fill: "#3B82F6",
                        },
                      }}
                    />
                  )
                })
              }
            </Geographies>
            {Object.entries(threatsByCountry).map(([countryCode, threats]) => {
              const coordinates = countryCoordinates[countryCode]
              if (!coordinates || threats.length < 10) return null

              return (
                <Marker key={countryCode} coordinates={coordinates}>
                  <circle
                    r={Math.min(Math.max(threats.length / 3, 3), 10)}
                    fill="#F43F5E"
                    stroke="#FFFFFF"
                    strokeWidth={1}
                  />
                  <text
                    textAnchor="middle"
                    y={-10}
                    style={{
                      fontFamily: "system-ui",
                      fontSize: "8px",
                      fill: "#FFFFFF",
                    }}
                  >
                    {threats.length}
                  </text>
                </Marker>
              )
            })}
          </ComposableMap>
          {tooltipContent && (
            <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-1 text-xs text-white">
              {tooltipContent}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
