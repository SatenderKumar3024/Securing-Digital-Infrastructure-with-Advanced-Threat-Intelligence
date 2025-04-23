import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, FileText, ShieldAlert } from "lucide-react"

export function ResearchSection() {
  return (
    <section className="bg-slate-900 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Research & Compliance</h2>
          <p className="mt-4 text-xl text-muted-foreground">
            Implementation details and compliance alignment with industry standards
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle>NIST 800-53 Implementation</CardTitle>
              <CardDescription>Security control framework alignment</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">AC-1: Access Control Policy and Procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">AC-2: Account Management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">AC-3: Access Enforcement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">AC-4: Information Flow Enforcement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                  <span className="text-sm">AC-5: Separation of Duties</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle>Case Studies</CardTitle>
              <CardDescription>Real-world security implementations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border border-slate-700 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-cyan-500" />
                    <h3 className="text-sm font-medium">Financial Services IAM Implementation</h3>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Reduced excessive permissions by 40% while maintaining operational efficiency
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700 p-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-cyan-500" />
                    <h3 className="text-sm font-medium">Healthcare Data Protection</h3>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Implemented HIPAA-compliant access controls for patient data
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-slate-800/50">
            <CardHeader>
              <CardTitle>Common Vulnerabilities</CardTitle>
              <CardDescription>Security issues addressed in projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Excessive IAM Permissions</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Mitigated
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Insecure S3 Bucket Policies</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Mitigated
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldAlert className="h-4 w-4 text-amber-500" />
                    <span className="text-sm">Inadequate Logging & Monitoring</span>
                  </div>
                  <Badge variant="outline" className="bg-green-500/10 text-green-500">
                    Mitigated
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
