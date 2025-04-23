import { ResearchHeader } from "@/components/research-header"
import { ComplianceMapping } from "@/components/compliance-mapping"
import { CaseStudies } from "@/components/case-studies"
import { Vulnerabilities } from "@/components/vulnerabilities"

export default function ResearchPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <ResearchHeader />

      <div className="mt-12 space-y-16">
        <ComplianceMapping />
        <CaseStudies />
        <Vulnerabilities />
      </div>
    </div>
  )
}
