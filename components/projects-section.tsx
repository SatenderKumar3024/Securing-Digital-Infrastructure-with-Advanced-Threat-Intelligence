import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, Shield, Database, Lock } from "lucide-react"

export function ProjectsSection() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Featured Projects</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Implementing advanced security solutions for real-world challenges
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="overflow-hidden bg-gradient-to-br from-cyan-950/50 to-slate-900/80 transition-all hover:shadow-lg hover:shadow-cyan-500/10">
            <div className="aspect-video bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-6">
              <Shield className="h-12 w-12 text-cyan-500" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Real-Time Threat Intelligence Dashboard</h3>
              <p className="mt-2 text-muted-foreground">
                A web application designed to aggregate, process, and visualize global cyber threat intelligence feeds
                in real time.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/dashboard">
                  View Dashboard
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-gradient-to-br from-purple-950/50 to-slate-900/80 transition-all hover:shadow-lg hover:shadow-purple-500/10">
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6">
              <Database className="h-12 w-12 text-purple-500" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">IAM Policy Configuration</h3>
              <p className="mt-2 text-muted-foreground">
                Implementation of least-privilege access principles in cloud environments for AWS S3 buckets and Azure
                VMs.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/projects/iam-policy">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="overflow-hidden bg-gradient-to-br from-amber-950/50 to-slate-900/80 transition-all hover:shadow-lg hover:shadow-amber-500/10">
            <div className="aspect-video bg-gradient-to-br from-amber-500/20 to-red-500/20 p-6">
              <Lock className="h-12 w-12 text-amber-500" />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold">Zero Trust Architecture</h3>
              <p className="mt-2 text-muted-foreground">
                Implementation of Zero Trust principles by enforcing strict identity verification for every person and
                device.
              </p>
              <Button asChild variant="link" className="mt-4 px-0">
                <Link href="/projects/zero-trust">
                  Learn More
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
