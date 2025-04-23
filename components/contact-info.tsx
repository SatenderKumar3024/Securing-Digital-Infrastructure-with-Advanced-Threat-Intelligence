import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, Linkedin, Twitter, Calendar, ExternalLink, Download } from "lucide-react"

export function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Contact Information</h2>
        <p className="text-sm text-muted-foreground">Multiple ways to reach me</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Mail className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Email</div>
              <Link href="mailto:satenderkumar.analyst@gmail.com" className="text-sm font-medium hover:underline">
                satenderkumar.analyst@gmail.com
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Phone className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Phone</div>
              <div className="text-sm font-medium">+1 (226) 637-****</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Linkedin className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">LinkedIn</div>
              <Link
                href="https://www.linkedin.com/in/satender-singh2430/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                linkedin.com/in/satender-singh2430
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Twitter className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Twitter/X</div>
              <Link
                href="https://x.com/SatendeK2430"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                @SatendeK2430
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Calendly</div>
              <Link
                href="https://calendly.com/satenderkumar-analyst"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                calendly.com/satenderkumar-analyst
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex items-center gap-4 p-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <ExternalLink className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Linktree</div>
              <Link
                href="https://linktr.ee/satendersingh"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm font-medium hover:underline"
              >
                linktr.ee/satendersingh
                <ExternalLink className="h-3 w-3" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Button variant="outline" className="w-full gap-2">
          <Download className="h-4 w-4" />
          Download vCard
        </Button>
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center gap-4">
          <div className="h-px flex-1 bg-border"></div>
          <h3 className="text-sm font-medium">Satender Kumar</h3>
          <div className="h-px flex-1 bg-border"></div>
        </div>
        <p className="text-sm text-muted-foreground">
          Information Security Analyst specializing in cloud security, SIEM, and threat detection.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-4">
        <div>
          <h3 className="text-xs font-medium">Quick Links</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-primary hover:underline">
                About
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-primary hover:underline">
                Experience
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-primary hover:underline">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/research" className="hover:text-primary hover:underline">
                Certifications
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-primary hover:underline">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xs font-medium">Connect</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
            <li>
              <Link
                href="https://www.linkedin.com/in/satender-singh2430/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                LinkedIn
              </Link>
            </li>
            <li>
              <Link
                href="https://x.com/SatendeK2430"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                Twitter/X
              </Link>
            </li>
            <li>
              <Link
                href="https://calendly.com/satenderkumar-analyst"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                Calendly
              </Link>
            </li>
            <li>
              <Link
                href="https://linktr.ee/satendersingh"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary hover:underline"
              >
                Linktree
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
