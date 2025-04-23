"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield } from "lucide-react"
import * as THREE from "three"

export function HeroSection() {
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

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // Create a shield-like geometry
    const geometry = new THREE.IcosahedronGeometry(5, 2)
    const material = new THREE.MeshStandardMaterial({
      color: 0x0ea5e9,
      wireframe: true,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.2,
    })

    const shield = new THREE.Mesh(geometry, material)
    scene.add(shield)

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
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    window.addEventListener("resize", handleResize)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)

      shield.rotation.x += 0.003
      shield.rotation.y += 0.005

      renderer.render(scene, camera)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      scene.remove(shield)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="container relative z-10 mx-auto flex flex-col items-center px-4 text-center">
        <div className="inline-flex items-center justify-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-sm text-cyan-500">
          <Shield className="mr-1 h-3.5 w-3.5" />
          Information Security Specialist
        </div>
        <h1 className="mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Securing Digital Infrastructure with{" "}
          <span className="text-gradient bg-gradient-to-r from-cyan-500 to-blue-500">Advanced Threat Intelligence</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Specializing in cloud security, SIEM implementation, and real-time threat detection systems to protect
          organizations from evolving cyber threats.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              View Threat Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/projects">Explore Projects</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
