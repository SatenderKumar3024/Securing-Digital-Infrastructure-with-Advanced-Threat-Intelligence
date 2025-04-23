import { HeroSection } from "@/components/hero-section"
import { ProjectsSection } from "@/components/projects-section"
import { SecurityAwarenessSection } from "@/components/security-awareness-section"
import { ResearchSection } from "@/components/research-section"
import { ContactCTA } from "@/components/contact-cta"

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <ProjectsSection />
      <SecurityAwarenessSection />
      <ResearchSection />
      <ContactCTA />
    </div>
  )
}
