"use client"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react"

interface AnalyticsStatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  description?: string
  trend?: string
  trendUp?: boolean
  isLoading?: boolean
  gradient: string
}

const AnalyticsStatCard = ({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendUp,
  isLoading,
  gradient,
}: AnalyticsStatCardProps) => {
  if (isLoading) {
    return (
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-1/2" />
            <div className="h-8 bg-muted rounded w-3/4" />
            <div className="h-3 bg-muted rounded w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
      <CardContent className="p-0">
        {/* Gradient accent bar */}
        <div className={cn("h-1 w-full bg-gradient-to-r", gradient)} />
        <div className="p-6">
          <div className="flex items-start justify-between">
            <div className="space-y-1 flex-1 min-w-0">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold tracking-tight truncate">{value}</p>
              {description && (
                <p className="text-xs text-muted-foreground truncate" title={description}>
                  {description}
                </p>
              )}
            </div>
            <div
              className={cn(
                "h-12 w-12 rounded-xl flex items-center justify-center text-white bg-gradient-to-br flex-shrink-0 ml-3 group-hover:scale-110 transition-transform duration-300",
                gradient
              )}
            >
              <Icon className="h-6 w-6" />
            </div>
          </div>

          {trend && (
            <div className="mt-4 flex items-center gap-1.5">
              {trendUp ? (
                <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <TrendingDown className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={cn(
                  "text-xs font-semibold",
                  trendUp ? "text-emerald-500" : "text-red-500"
                )}
              >
                {trend}
              </span>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

export default AnalyticsStatCard
