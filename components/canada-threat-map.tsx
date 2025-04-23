"use client"

import { useState, useEffect, useRef } from "react"
import * as d3 from "d3"
import { Card, CardContent } from "@/components/ui/card"

export function CanadaThreatMap() {
  const svgRef = useRef<SVGSVGElement>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null)

  // Mock threat data for Canadian provinces
  const provinceThreatData = {
    ON: { name: "Ontario", count: 432, severity: "critical" },
    QC: { name: "Quebec", count: 273, severity: "high" },
    BC: { name: "British Columbia", count: 205, severity: "high" },
    AB: { name: "Alberta", count: 137, severity: "medium" },
    MB: { name: "Manitoba", count: 91, severity: "medium" },
    SK: { name: "Saskatchewan", count: 78, severity: "low" },
    NS: { name: "Nova Scotia", count: 65, severity: "low" },
    NB: { name: "New Brunswick", count: 54, severity: "low" },
    NL: { name: "Newfoundland and Labrador", count: 42, severity: "low" },
    PE: { name: "Prince Edward Island", count: 23, severity: "low" },
    NT: { name: "Northwest Territories", count: 18, severity: "low" },
    YT: { name: "Yukon", count: 15, severity: "low" },
    NU: { name: "Nunavut", count: 12, severity: "low" },
  }

  // Get color based on threat severity
  const getProvinceColor = (provinceCode: string) => {
    const provinceData = provinceThreatData[provinceCode as keyof typeof provinceThreatData]
    if (!provinceData) return "#2C3440"

    switch (provinceData.severity) {
      case "critical":
        return "#DC2626"
      case "high":
        return "#DB2777"
      case "medium":
        return "#9333EA"
      case "low":
        return "#2563EB"
      default:
        return "#2C3440"
    }
  }

  useEffect(() => {
    if (!svgRef.current) return

    const width = 800
    const height = 600

    // Clear any existing SVG content
    d3.select(svgRef.current).selectAll("*").remove()

    const svg = d3
      .select(svgRef.current)
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")

    // Create a projection for Canada
    const projection = d3
      .geoMercator()
      .center([-96, 60])
      .scale(500)
      .translate([width / 2, height / 2])

    const path = d3.geoPath().projection(projection)

    // Load Canada GeoJSON
    d3.json("https://raw.githubusercontent.com/codeforgermany/click_that_hood/main/public/data/canada.geojson")
      .then((data: any) => {
        // Draw provinces
        svg
          .selectAll("path")
          .data(data.features)
          .enter()
          .append("path")
          .attr("d", path as any)
          .attr("fill", (d: any) => getProvinceColor(d.properties.code))
          .attr("stroke", "#1F2937")
          .attr("stroke-width", 0.5)
          .attr("opacity", (d: any) => {
            if (!selectedProvince) return 1
            return selectedProvince === d.properties.code ? 1 : 0.3
          })
          .attr("cursor", "pointer")
          .on("mouseover", function (event: MouseEvent, d: any) {
            const provinceCode = d.properties.code
            const provinceData = provinceThreatData[provinceCode as keyof typeof provinceThreatData]

            if (provinceData) {
              d3.select(this).attr("stroke-width", 1.5)

              if (tooltipRef.current) {
                tooltipRef.current.style.display = "block"
                tooltipRef.current.style.left = `${event.pageX + 10}px`
                tooltipRef.current.style.top = `${event.pageY - 30}px`
                tooltipRef.current.innerHTML = `
                  <div class="font-medium">${provinceData.name}</div>
                  <div>${provinceData.count} threats (${provinceData.severity})</div>
                `
              }
            }
          })
          .on("mouseout", function () {
            d3.select(this).attr("stroke-width", 0.5)
            if (tooltipRef.current) {
              tooltipRef.current.style.display = "none"
            }
          })
          .on("click", (event: MouseEvent, d: any) => {
            const provinceCode = d.properties.code
            setSelectedProvince(selectedProvince === provinceCode ? null : provinceCode)
          })

        // Add province labels
        svg
          .selectAll("text")
          .data(data.features)
          .enter()
          .append("text")
          .attr("transform", (d: any) => {
            const centroid = path.centroid(d)
            return centroid ? `translate(${centroid[0]},${centroid[1]})` : ""
          })
          .attr("text-anchor", "middle")
          .attr("font-size", "8px")
          .attr("fill", "#ffffff")
          .attr("pointer-events", "none")
          .text((d: any) => d.properties.code)
      })
      .catch((error) => console.error("Error loading Canada map:", error))

    // Add threat markers
    Object.entries(provinceThreatData).forEach(([code, data]) => {
      // We would need province center coordinates here
      // This is simplified for the example
    })
  }, [selectedProvince])

  return (
    <Card className="overflow-hidden border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg">
      <CardContent className="p-4">
        <div className="relative h-[500px] w-full">
          <svg ref={svgRef} className="h-full w-full"></svg>
          <div
            ref={tooltipRef}
            className="absolute hidden rounded bg-black/80 px-2 py-1 text-xs text-white"
            style={{ pointerEvents: "none" }}
          ></div>

          <div className="absolute bottom-4 left-4 rounded-lg bg-black/50 p-2">
            <div className="text-xs font-medium text-white">Threat Severity</div>
            <div className="mt-1 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-red-600"></div>
                <span className="text-xs text-white">Critical</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-pink-600"></div>
                <span className="text-xs text-white">High</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-purple-600"></div>
                <span className="text-xs text-white">Medium</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                <span className="text-xs text-white">Low</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
