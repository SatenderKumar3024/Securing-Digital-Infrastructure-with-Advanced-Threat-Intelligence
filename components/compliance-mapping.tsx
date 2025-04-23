import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

export function ComplianceMapping() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">NIST 800-53 Implementation</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Access Control</CardTitle>
            <CardDescription>AC family controls</CardDescription>
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

        <Card>
          <CardHeader>
            <CardTitle>Audit & Accountability</CardTitle>
            <CardDescription>AU family controls</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">AU-2: Audit Events</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">AU-3: Content of Audit Records</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">AU-6: Audit Review, Analysis, and Reporting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">AU-8: Time Stamps</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">AU-9: Protection of Audit Information</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Risk Assessment</CardTitle>
            <CardDescription>RA family controls</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">RA-3: Risk Assessment</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">RA-5: Vulnerability Scanning</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">RA-7: Risk Response</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">RA-9: Criticality Analysis</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-4 w-4 text-green-500" />
                <span className="text-sm">RA-10: Threat Hunting</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
