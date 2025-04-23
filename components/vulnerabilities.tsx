import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShieldAlert, CheckCircle } from "lucide-react"

export function Vulnerabilities() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Common Vulnerabilities</h2>
      <Card>
        <CardHeader>
          <CardTitle>Security Issues Addressed in Projects</CardTitle>
          <CardDescription>Vulnerabilities mitigated through proper IAM implementation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-medium">Excessive IAM Permissions</h3>
                  <p className="text-sm text-muted-foreground">
                    Over-privileged accounts that violate the principle of least privilege, creating unnecessary
                    security risks.
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Mitigated
              </Badge>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-medium">Insecure S3 Bucket Policies</h3>
                  <p className="text-sm text-muted-foreground">
                    Misconfigured S3 bucket policies that could allow unauthorized access to sensitive data.
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Mitigated
              </Badge>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-medium">Inadequate Logging & Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Insufficient audit trails and monitoring capabilities to detect and respond to security incidents.
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Mitigated
              </Badge>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-medium">Lack of MFA Implementation</h3>
                  <p className="text-sm text-muted-foreground">
                    Single-factor authentication for privileged accounts, increasing the risk of unauthorized access.
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Mitigated
              </Badge>
            </div>

            <div className="flex items-start justify-between gap-4 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-0.5 h-5 w-5 text-amber-500" />
                <div>
                  <h3 className="font-medium">Phishing Vulnerability</h3>
                  <p className="text-sm text-muted-foreground">
                    Susceptibility to phishing attacks that could compromise credentials and lead to unauthorized
                    access.
                  </p>
                </div>
              </div>
              <Badge variant="outline" className="bg-green-500/10 text-green-500">
                <CheckCircle className="mr-1 h-3 w-3" />
                Mitigated
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
