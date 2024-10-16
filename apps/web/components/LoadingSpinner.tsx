import { Loader2 } from "lucide-react"

export const LoadingSpinner = () => (
  <div className="absolute inset-0 flex items-center justify-center bg-background">
    <Loader2 className="w-5 h-5 text-foreground animate-spin" />
    <span className="ml-2 text-foreground">Loading...</span>
  </div>
)
