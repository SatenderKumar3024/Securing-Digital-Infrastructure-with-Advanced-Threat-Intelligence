"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import * as THREE from "three"

export function ProjectsShowcase() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Initialize Three.js scene
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    })

    renderer.setSize(window.innerWidth, window.innerHeight * 0.4)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create a network visualization
    const nodes: THREE.Mesh[] = []
    const nodeCount = 30 // Increased node count
    const nodeGeometry = new THREE.SphereGeometry(0.2, 16, 16)

    // Create nodes with different colors
    for (let i = 0; i < nodeCount; i++) {
      const colorIndex = Math.floor(Math.random() * 5) + 1
      const colorMap = {
        1: 0x0ea5e9, // cyan
        2: 0x9333ea, // purple
        3: 0xf43f5e, // pink
        4: 0x22c55e, // green
        5: 0xf59e0b, // amber
      }

      const color = colorMap[colorIndex as keyof typeof colorMap]

      const nodeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        emissive: new THREE.Color(color),
        emissiveIntensity: 0.3,
      })

      const node = new THREE.Mesh(nodeGeometry, nodeMaterial)

      // Distribute nodes in a more interesting pattern
      const radius = 5 + Math.random() * 5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI

      node.position.x = radius * Math.sin(phi) * Math.cos(theta)
      node.position.y = radius * Math.sin(phi) * Math.sin(theta)
      node.position.z = radius * Math.cos(phi)

      // Add velocity for animation
      node.userData = {
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
        ),
      }

      scene.add(node)
      nodes.push(node)
    }

    // Create connections between nodes
    const connections: THREE.Line[] = []
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0ea5e9, transparent: true, opacity: 0.3 })

    for (let i = 0; i < nodeCount; i++) {
      for (let j = i + 1; j < nodeCount; j++) {
        if (Math.random() > 0.85) continue // Fewer connections for cleaner look

        const points = [nodes[i].position, nodes[j].position]
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points)
        const line = new THREE.Line(lineGeometry, lineMaterial)
        scene.add(line)
        connections.push(line)

        // Store the connected nodes indices
        line.userData = { fromIndex: i, toIndex: j }
      }
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    // Add point light
    const pointLight = new THREE.PointLight(0x0ea5e9, 1)
    pointLight.position.set(10, 10, 10)
    scene.add(pointLight)

    // Position camera
    camera.position.z = 15

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight * 0.4)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      // Move nodes
      nodes.forEach((node) => {
        // Update position based on velocity
        node.position.add(node.userData.velocity)

        // Bounce off invisible boundaries
        const bounds = 10
        ;["x", "y", "z"].forEach((axis) => {
          if (Math.abs(node.position[axis]) > bounds) {
            node.userData.velocity[axis] *= -1
          }
        })

        // Rotate nodes
        node.rotation.x += 0.01
        node.rotation.y += 0.01
      })

      // Update connections
      connections.forEach((line) => {
        const { fromIndex, toIndex } = line.userData
        const fromNode = nodes[fromIndex]
        const toNode = nodes[toIndex]

        // Update line geometry to match node positions
        const points = [fromNode.position, toNode.position]
        line.geometry.setFromPoints(points)
        line.geometry.attributes.position.needsUpdate = true
      })

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      renderer.dispose()
      nodes.forEach((node) => {
        node.geometry.dispose()
        ;(node.material as THREE.Material).dispose()
      })
      connections.forEach((line) => {
        line.geometry.dispose()
        ;(line.material as THREE.Material).dispose()
      })
    }
  }, [])

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <canvas ref={canvasRef} className="h-[40vh] w-full" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Project Overview</h2>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
              A comprehensive approach to implementing least-privilege access principles in cloud environments.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
