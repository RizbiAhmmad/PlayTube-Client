/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IAnalyticsTypeDistribution } from "@/types/dashboard.types"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

interface RevenueByTypeChartProps {
  data: IAnalyticsTypeDistribution[]
  isLoading?: boolean
}

const TYPE_COLORS: Record<string, string> = {
  PURCHASE: "#3b82f6",
  RENT: "#8b5cf6",
  SUBSCRIPTION: "#10b981",
}

const TYPE_LABELS: Record<string, string> = {
  PURCHASE: "Purchase",
  RENT: "Rent",
  SUBSCRIPTION: "Subscription",
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const item = payload[0]
    return (
      <div className="bg-background border rounded-xl shadow-lg p-3 text-sm space-y-1">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: item.payload.fill }} />
          <span className="font-semibold">{TYPE_LABELS[item.name] ?? item.name}</span>
        </div>
        <p className="text-muted-foreground">
          Revenue: <span className="font-bold text-foreground">${(item.value ?? 0).toFixed(2)}</span>
        </p>
        <p className="text-muted-foreground">
          Orders: <span className="font-bold text-foreground">{item.payload.count}</span>
        </p>
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => (
  <ul className="flex flex-col gap-2 mt-3">
    {payload?.map((entry: any) => (
      <li key={entry.value} className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
          <span className="text-muted-foreground">{TYPE_LABELS[entry.value] ?? entry.value}</span>
        </div>
        <span className="font-semibold">${(entry.payload?.revenue ?? 0).toFixed(2)}</span>
      </li>
    ))}
  </ul>
)

const RevenueByTypeChart = ({ data, isLoading }: RevenueByTypeChartProps) => {
  const chartData = data.map((d) => ({
    name: d.type,
    value: d.revenue ?? 0,
    count: d.count,
    fill: TYPE_COLORS[d.type] ?? "#94a3b8",
  }))

  const isEmpty = !data || data.length === 0

  return (
    <Card className="shadow-sm border-0 h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Revenue by Type</CardTitle>
        <p className="text-xs text-muted-foreground">Breakdown of sales, rentals & subscriptions</p>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground text-sm">Loading chart...</div>
          </div>
        ) : isEmpty ? (
          <div className="h-64 flex flex-col items-center justify-center gap-2">
            <div className="text-4xl">🍩</div>
            <p className="text-muted-foreground text-sm">No data available yet.</p>
          </div>
        ) : (
          <div>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend payload={chartData.map((d) => ({ value: d.name, color: d.fill, payload: d }))} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RevenueByTypeChart
