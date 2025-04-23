import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText } from "lucide-react"

export function CaseStudies() {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold tracking-tight">Case Studies</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyan-500" />
              <CardTitle>Financial Services IAM Implementation</CardTitle>
            </div>
            <CardDescription>Reducing excessive permissions while maintaining operational efficiency</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Challenge</h3>
                <p className="text-sm text-muted-foreground">
                  A financial services company had accumulated excessive IAM permissions over time, creating security
                  risks and compliance issues.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Solution</h3>
                <p className="text-sm text-muted-foreground">
                  Implemented least-privilege access principles by analyzing permission usage patterns and creating
                  role-based access controls.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Results</h3>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border p-2">
                    <div className="text-lg font-bold text-cyan-500">40%</div>
                    <div className="text-xs text-muted-foreground">Reduction in permissions</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-lg font-bold text-cyan-500">60%</div>
                    <div className="text-xs text-muted-foreground">Fewer policy exceptions</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-lg font-bold text-cyan-500">0</div>
                    <div className="text-xs text-muted-foreground">Operational disruptions</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-cyan-500" />
              <CardTitle>Healthcare Data Protection</CardTitle>
            </div>
            <CardDescription>Implementing HIPAA-compliant access controls for patient data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Challenge</h3>
                <p className="text-sm text-muted-foreground">
                  A healthcare provider needed to ensure HIPAA compliance while allowing appropriate access to patient
                  data across multiple systems.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Solution</h3>
                <p className="text-sm text-muted-foreground">
                  Implemented role-based access controls with data classification and implemented comprehensive audit
                  logging.
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Results</h3>
                <div className="mt-2 grid grid-cols-3 gap-2 text-center">
                  <div className="rounded-lg border p-2">
                    <div className="text-lg font-bold text-cyan-500">100%</div>
                    <div className="text-xs text-muted-foreground">HIPAA compliance</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-lg font-bold text-cyan-500">30%</div>
                    <div className="text-xs text-muted-foreground">Reduced access incidents</div>
                  </div>
                  <div className="rounded-lg border p-2">
                    <div className="text-lg font-bold text-cyan-500">15min</div>
                    <div className="text-xs text-muted-foreground">Avg. incident response</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
