import { IOCsHeader } from "@/components/iocs-header"
import { IOCsTable } from "@/components/iocs-table"
import { fetchThreatData } from "@/lib/data"

export default async function IOCsPage() {
  const threatData = await fetchThreatData()

  return (
    <div className="space-y-6">
      <IOCsHeader />
      <IOCsTable data={threatData} />
    </div>
  )
}
