import { ContactForm } from "@/components/contact-form"
import { ContactInfo } from "@/components/contact-info"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">Contact Me</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          I'm always open to discussing new projects, cybersecurity challenges, or opportunities.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        <ContactForm />
        <ContactInfo />
      </div>
    </div>
  )
}
