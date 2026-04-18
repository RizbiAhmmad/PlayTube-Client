"use client"

import { getAnalyticsData } from "@/services/dashboard.services"
import { IAnalyticsData } from "@/types/dashboard.types"
import { useQuery } from "@tanstack/react-query"
import {
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Trophy,
} from "lucide-react"
import AnalyticsStatCard from "./AnalyticsStatCard"
import SalesOverTimeChart from "./SalesOverTimeChart"
import RevenueByTypeChart from "./RevenueByTypeChart"
import TopMediaChart from "./TopMediaChart"


const AnalyticsDashboard = () => {
  const { data: analyticsResponse, isLoading } = useQuery({
    queryKey: ["analytics-data"],
    queryFn: getAnalyticsData,
    refetchOnWindowFocus: "always",
  })

  const data = analyticsResponse?.data as IAnalyticsData | null

  const avgOrderValue =
    data && data.totalSales > 0
      ? (data.totalRevenue / data.totalSales).toFixed(2)
      : "0.00"

  return (
    <div className="flex flex-col gap-8 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Sales & Rental Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive overview of your platform&apos;s revenue and sales performance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsStatCard
          title="Total Revenue"
          value={`$${(data?.totalRevenue ?? 0).toFixed(2)}`}
          icon={DollarSign}
          description="All-time earned from sales & rentals"
          trend="+12.5%"
          trendUp
          isLoading={isLoading}
          gradient="from-emerald-500 to-teal-600"
        />
        <AnalyticsStatCard
          title="Total Transactions"
          value={data?.totalSales ?? 0}
          icon={ShoppingCart}
          description="Completed paid orders"
          trend="+8.2%"
          trendUp
          isLoading={isLoading}
          gradient="from-blue-500 to-indigo-600"
        />
        <AnalyticsStatCard
          title="Avg. Order Value"
          value={`$${avgOrderValue}`}
          icon={TrendingUp}
          description="Revenue per transaction"
          trend="+3.1%"
          trendUp
          isLoading={isLoading}
          gradient="from-violet-500 to-purple-600"
        />
        <AnalyticsStatCard
          title="Top Media Sales"
          value={data?.topMedia?.[0]?.count ?? 0}
          icon={Trophy}
          description={data?.topMedia?.[0]?.title ?? "No data yet"}
          isLoading={isLoading}
          gradient="from-amber-500 to-orange-600"
        />
      </div>

      {/* Charts Row 1: Sales Over Time + Revenue by Type */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesOverTimeChart data={data?.salesOverTime ?? []} isLoading={isLoading} />
        </div>
        <div className="lg:col-span-1">
          <RevenueByTypeChart data={data?.typeDistribution ?? []} isLoading={isLoading} />
        </div>
      </div>

      {/* Charts Row 2: Top Media */}
      <TopMediaChart data={data?.topMedia ?? []} isLoading={isLoading} />
    </div>
  )
}

export default AnalyticsDashboard
