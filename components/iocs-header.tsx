import { AlertTriangle, Info } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function IOCsHeader() {
  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Indicators of Compromise</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="h-5 w-5 cursor-help text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p className="max-w-xs">
                IOCs are artifacts observed on a network or in an operating system that indicate a computer intrusion
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <p className="text-muted-foreground">
          Comprehensive list of all detected IOCs with detailed information and filtering options.
        </p>
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-chart-1/10 text-chart-1">
            <AlertTriangle className="mr-1 h-3 w-3" />
            Real-time updates
          </Badge>
        </div>
      </div>
    </div>
  )
}
