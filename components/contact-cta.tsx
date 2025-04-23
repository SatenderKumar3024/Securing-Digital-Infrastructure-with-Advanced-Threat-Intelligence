import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function ContactCTA() {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          Let's Discuss Your Security Challenges
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-xl text-muted-foreground">
          I'm always open to discussing new projects, cybersecurity challenges, or opportunities.
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href="/contact">
            Get In Touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
