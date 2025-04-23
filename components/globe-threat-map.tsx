"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { Badge } from "@/components/ui/badge"

interface CountryThreat {
  country: string
  countryName: string
  coordinates: [number, number]
  count: number
  severity: "critical" | "high" | "medium" | "low"
}

export function GlobeThreatMap({ data }: { data?: any }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipData, setTooltipData] = useState({ content: "", x: 0, y: 0 })
  const [topCountries, setTopCountries] = useState<CountryThreat[]>([])
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)

  // Refs to store scene objects
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const markersRef = useRef<THREE.Mesh[]>([])
  const animationFrameRef = useRef<number | null>(null)

  // Mock threat data
  const mockThreatData: CountryThreat[] = [
    {
      country: "US",
      countryName: "United States",
      coordinates: [-95.7129, 37.0902],
      count: 45,
      severity: "high",
    },
    {
      country: "RU",
      countryName: "Russia",
      coordinates: [105.3188, 61.524],
      count: 38,
      severity: "critical",
    },
    {
      country: "CN",
      countryName: "China",
      coordinates: [104.1954, 35.8617],
      count: 32,
      severity: "critical",
    },
    {
      country: "BR",
      countryName: "Brazil",
      coordinates: [-51.9253, -14.235],
      count: 18,
      severity: "medium",
    },
    {
      country: "IN",
      countryName: "India",
      coordinates: [78.9629, 20.5937],
      count: 24,
      severity: "high",
    },
    {
      country: "GB",
      countryName: "United Kingdom",
      coordinates: [-3.4359, 55.3781],
      count: 15,
      severity: "medium",
    },
    {
      country: "DE",
      countryName: "Germany",
      coordinates: [10.4515, 51.1657],
      count: 12,
      severity: "medium",
    },
    {
      country: "CA",
      countryName: "Canada",
      coordinates: [-106.3468, 56.1304],
      count: 22,
      severity: "high",
    },
  ]

  // Calculate top 10 countries by threat count
  useEffect(() => {
    const sortedCountries = [...mockThreatData].sort((a, b) => b.count - a.count).slice(0, 10)
    setTopCountries(sortedCountries)
  }, [])

  // Handle tooltip updates
  const updateTooltip = useCallback((content: string, x: number, y: number, show: boolean) => {
    if (show) {
      setTooltipData({ content, x, y })
      setShowTooltip(true)
    } else {
      setShowTooltip(false)
    }
  }, [])

  // Handle country selection
  const handleCountrySelection = useCallback((countryCode: string | null) => {
    setSelectedCountry(countryCode)

    // Update marker opacities
    if (markersRef.current.length > 0) {
      markersRef.current.forEach((marker) => {
        const material = marker.material as THREE.MeshBasicMaterial
        material.opacity = countryCode === null || marker.userData.country === countryCode ? 1 : 0.3
      })
    }
  }, [])

  // Get severity color for badges
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/10 text-red-500"
      case "high":
        return "bg-orange-500/10 text-orange-500"
      case "medium":
        return "bg-yellow-500/10 text-yellow-500"
      case "low":
        return "bg-green-500/10 text-green-500"
      default:
        return "bg-blue-500/10 text-blue-500"
    }
  }

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene
    scene.background = new THREE.Color(0x1a1c29)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 200

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.rotateSpeed = 0.5
    controls.minDistance = 100
    controls.maxDistance = 300
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.5

    // Earth
    const earthGeometry = new THREE.SphereGeometry(80, 64, 64)
    const earthMaterial = new THREE.MeshPhongMaterial({
      color: 0x2233ff,
      emissive: 0x112244,
      specular: 0x333333,
    })
    const earth = new THREE.Mesh(earthGeometry, earthMaterial)
    scene.add(earth)

    // Add atmosphere glow
    const atmosphereGeometry = new THREE.SphereGeometry(82, 64, 64)
    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x0077ff,
      transparent: true,
      opacity: 0.2,
      side: THREE.BackSide,
    })
    const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
    scene.add(atmosphere)

    // Add stars
    const starGeometry = new THREE.BufferGeometry()
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
    })

    const starVertices = []
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000
      const y = (Math.random() - 0.5) * 2000
      const z = (Math.random() - 0.5) * 2000
      starVertices.push(x, y, z)
    }

    starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(starGeometry, starMaterial)
    scene.add(stars)

    // Add threat markers
    const markers: THREE.Mesh[] = []
    const pulses: { mesh: THREE.Mesh; initialScale: number; maxScale: number; phase: number; speed: number }[] = []

    mockThreatData.forEach((threat) => {
      if (!threat.coordinates[0] || !threat.coordinates[1]) return

      // Convert lat/long to 3D coordinates
      const lat = threat.coordinates[1] * (Math.PI / 180)
      const lon = threat.coordinates[0] * (Math.PI / 180)
      const radius = 82

      const x = radius * Math.cos(lat) * Math.cos(lon)
      const y = radius * Math.sin(lat)
      const z = radius * Math.cos(lat) * Math.sin(lon)

      // Create marker
      const size = Math.min(Math.max(threat.count / 10, 1), 5)
      const markerGeometry = new THREE.SphereGeometry(size, 16, 16)

      // Set color based on severity
      let color
      switch (threat.severity) {
        case "critical":
          color = 0xff5555
          break
        case "high":
          color = 0xffaa55
          break
        case "medium":
          color = 0xaa55ff
          break
        case "low":
          color = 0x55ffaa
          break
      }

      const markerMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: selectedCountry ? (selectedCountry === threat.country ? 1 : 0.3) : 1,
      })
      const marker = new THREE.Mesh(markerGeometry, markerMaterial)

      marker.position.set(x, y, z)
      marker.userData = {
        country: threat.country,
        countryName: threat.countryName,
        count: threat.count,
        severity: threat.severity,
      }

      scene.add(marker)
      markers.push(marker)

      // Add pulsing effect
      const pulseGeometry = new THREE.SphereGeometry(size * 1.2, 16, 16)
      const pulseMaterial = new THREE.MeshBasicMaterial({
        color,
        transparent: true,
        opacity: 0.4,
      })
      const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial)
      pulse.position.set(x, y, z)
      scene.add(pulse)

      // Add to pulses array with random phase for animation
      pulses.push({
        mesh: pulse,
        initialScale: 1,
        maxScale: 2 + Math.random() * 0.5, // Random max scale between 2 and 2.5
        phase: Math.random() * Math.PI * 2, // Random starting phase
        speed: 0.03 + Math.random() * 0.02, // Random speed
      })
    })

    // Store markers in ref for later use
    markersRef.current = markers

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040, 1)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(1, 1, 1)
    scene.add(directionalLight)

    // Raycaster for interaction
    const raycaster = new THREE.Raycaster()
    const mouse = new THREE.Vector2()

    // Handle mouse move for tooltips
    const handleMouseMove = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(markers)

      if (intersects.length > 0) {
        const marker = intersects[0].object
        const userData = marker.userData
        const content = `${userData.countryName}: ${userData.count} threats (${userData.severity})`

        // Update tooltip
        updateTooltip(content, event.clientX, event.clientY, true)
      } else if (showTooltip) {
        updateTooltip("", 0, 0, false)
      }
    }

    // Handle click for country selection
    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect()
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

      raycaster.setFromCamera(mouse, camera)
      const intersects = raycaster.intersectObjects(markers)

      if (intersects.length > 0) {
        const marker = intersects[0].object
        const userData = marker.userData
        const clickedCountry = userData.country

        // Toggle selection
        if (selectedCountry === clickedCountry) {
          handleCountrySelection(null)
        } else {
          handleCountrySelection(clickedCountry)
        }
      }
    }

    renderer.domElement.addEventListener("mousemove", handleMouseMove)
    renderer.domElement.addEventListener("click", handleClick)

    // Animation loop with time
    let time = 0
    const animate = () => {
      time += 0.01

      // Animate pulses using sine wave
      pulses.forEach((pulse) => {
        const scale =
          pulse.initialScale + Math.sin(time * pulse.speed + pulse.phase) * (pulse.maxScale - pulse.initialScale)
        pulse.mesh.scale.set(scale, scale, scale)

        // Also adjust opacity based on scale
        const material = pulse.mesh.material as THREE.MeshBasicMaterial
        material.opacity = 0.4 * (1 - ((scale - pulse.initialScale) / (pulse.maxScale - pulse.initialScale)) * 0.5)
      })

      controls.update()
      renderer.render(scene, camera)
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }

      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement)
      }

      renderer.domElement.removeEventListener("mousemove", handleMouseMove)
      renderer.domElement.removeEventListener("click", handleClick)
      window.removeEventListener("resize", handleResize)

      controls.dispose()

      markers.forEach((marker) => {
        marker.geometry.dispose()
        ;(marker.material as THREE.Material).dispose()
      })

      pulses.forEach((pulse) => {
        pulse.mesh.geometry.dispose()
        ;(pulse.mesh.material as THREE.Material).dispose()
      })
    }
  }, [selectedCountry, showTooltip, updateTooltip, handleCountrySelection])

  return (
    <Card className="col-span-1 overflow-hidden border-none bg-gradient-to-br from-slate-800/80 to-slate-900/80 shadow-lg lg:col-span-1">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-base font-medium">
          <span>Global Threat Map</span>
          <span className="text-xs text-muted-foreground">Real-time visualization</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
          <div className="lg:col-span-3">
            <div ref={containerRef} className="relative h-[400px] w-full rounded-lg bg-slate-900/50">
              {showTooltip && (
                <div
                  className="absolute z-50 rounded bg-black/80 px-2 py-1 text-xs text-white"
                  style={{
                    left: `${tooltipData.x}px`,
                    top: `${tooltipData.y}px`,
                    transform: "translate(-50%, -100%)",
                  }}
                >
                  {tooltipData.content}
                </div>
              )}
            </div>
          </div>
          <div className="lg:col-span-1">
            <div className="rounded-lg bg-slate-800/50 p-3">
              <h3 className="mb-2 text-sm font-medium">Top 10 Threat Countries</h3>
              <div className="max-h-[340px] space-y-2 overflow-y-auto pr-1">
                {topCountries.map((country, index) => (
                  <div
                    key={country.country}
                    className={`flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-slate-700/50 ${selectedCountry === country.country ? "bg-slate-700/50" : ""}`}
                    onClick={() => handleCountrySelection(selectedCountry === country.country ? null : country.country)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-700 text-xs font-medium">
                        {index + 1}
                      </span>
                      <span className="text-sm">{country.countryName}</span>
                    </div>
                    <Badge variant="outline" className={`${getSeverityColor(country.severity)}`}>
                      {country.count}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
