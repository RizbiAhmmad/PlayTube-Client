/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ITopMedia } from "@/types/dashboard.types"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface TopMediaChartProps {
  data: ITopMedia[]
  isLoading?: boolean
}

const BAR_COLORS = [
  "#3b82f6",
  "#8b5cf6",
  "#10b981",
  "#f59e0b",
  "#ef4444",
]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-xl shadow-lg p-3 text-sm space-y-1.5">
        <p className="font-semibold text-foreground truncate max-w-[180px]">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">Revenue:</span>
          <span className="font-bold">${payload[0]?.value?.toFixed(2)}</span>
        </div>
        {payload[1] && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-muted-foreground">Orders:</span>
            <span className="font-bold">{payload[1]?.value}</span>
          </div>
        )}
      </div>
    )
  }
  return null
}

const TopMediaChart = ({ data, isLoading }: TopMediaChartProps) => {
  const isEmpty = !data || data.length === 0

  // Truncate long titles for axis display
  const chartData = data.map((item, i) => ({
    ...item,
    shortTitle: item.title.length > 20 ? item.title.slice(0, 18) + "…" : item.title,
    color: BAR_COLORS[i % BAR_COLORS.length],
  }))

  return (
    <Card className="shadow-sm border-0">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Top Performing Media</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">
              Highest revenue-generating titles on your platform
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-72 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground text-sm">Loading chart...</div>
          </div>
        ) : isEmpty ? (
          <div className="h-72 flex flex-col items-center justify-center gap-2">
            <div className="text-5xl">🏆</div>
            <p className="text-muted-foreground text-sm font-medium">No sales data yet.</p>
            <p className="text-muted-foreground text-xs">
              Top media will appear here after sales are recorded.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-center">
            {/* Bar Chart */}
            <div className="lg:col-span-3">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart
                  data={chartData}
                  margin={{ top: 4, right: 8, bottom: 0, left: 0 }}
                  barCategoryGap="30%"
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis
                    dataKey="shortTitle"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    dy={8}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => `$${v}`}
                    width={55}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "hsl(var(--muted))", radius: 4 }} />
                  <Bar dataKey="revenue" radius={[6, 6, 0, 0]} maxBarSize={60}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Rankings List */}
            <div className="lg:col-span-2 space-y-3">
              {chartData.map((item, index) => (
                <div
                  key={item.title}
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/70 transition-colors"
                >
                  <div
                    className="flex items-center justify-center h-8 w-8 rounded-lg text-white text-xs font-bold flex-shrink-0"
                    style={{ background: item.color }}
                  >
                    #{index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate" title={item.title}>
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.count} {item.count === 1 ? "sale" : "sales"}
                    </p>
                  </div>
                  <div className="text-sm font-bold text-right flex-shrink-0">
                    ${item.revenue.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default TopMediaChart
