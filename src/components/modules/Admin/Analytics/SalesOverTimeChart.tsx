/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ISalesOverTime } from "@/types/dashboard.types"
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

interface SalesOverTimeChartProps {
  data: ISalesOverTime[]
  isLoading?: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-xl shadow-lg p-3 text-sm space-y-1.5">
        <p className="font-semibold text-foreground">{label}</p>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-muted-foreground">Revenue:</span>
          <span className="font-bold text-foreground">${payload[0]?.value?.toFixed(2)}</span>
        </div>
        {payload[1] && (
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-violet-500" />
            <span className="text-muted-foreground">Orders:</span>
            <span className="font-bold text-foreground">{payload[1]?.value}</span>
          </div>
        )}
      </div>
    )
  }
  return null
}

const SalesOverTimeChart = ({ data, isLoading }: SalesOverTimeChartProps) => {
  const isEmpty = !data || data.length === 0

  return (
    <Card className="shadow-sm border-0 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold">Revenue Over Time</CardTitle>
            <p className="text-xs text-muted-foreground mt-0.5">Monthly sales and revenue trend</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <span className="text-muted-foreground">Revenue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-violet-500" />
              <span className="text-muted-foreground">Orders</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="h-64 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground text-sm">Loading chart...</div>
          </div>
        ) : isEmpty ? (
          <div className="h-64 flex flex-col items-center justify-center gap-2">
            <div className="text-4xl">📊</div>
            <p className="text-muted-foreground text-sm">No sales data available yet.</p>
            <p className="text-muted-foreground text-xs">Data will appear here once sales are recorded.</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={256}>
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="ordersGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis
                dataKey="month"
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
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2.5}
                fill="url(#revenueGrad)"
                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#3b82f6" }}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#8b5cf6"
                strokeWidth={2.5}
                fill="url(#ordersGrad)"
                dot={{ r: 4, fill: "#8b5cf6", strokeWidth: 2, stroke: "#fff" }}
                activeDot={{ r: 6, fill: "#8b5cf6" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  )
}

export default SalesOverTimeChart
