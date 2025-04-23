import Link from "next/link"
import { Shield } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t bg-slate-950 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-cyan-500" />
            <span className="text-sm font-semibold">Satender Kumar</span>
          </div>

          <nav className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary hover:underline">
              Privacy Policy
            </Link>
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary hover:underline">
              Terms of Service
            </Link>
            <Link href="/" className="text-xs text-muted-foreground hover:text-primary hover:underline">
              Cookie Policy
            </Link>
          </nav>

          <div className="text-xs text-muted-foreground">
            © 2025 Satender Kumar. All rights reserved. Secured with SSL encryption.
          </div>
        </div>
      </div>
    </footer>
  )
}
