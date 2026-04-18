import AnalyticsDashboard from "@/components/modules/Admin/Analytics/AnalyticsDashboard"
import { getAnalyticsData } from "@/services/dashboard.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const AnalyticsPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["analytics-data"],
    queryFn: getAnalyticsData,
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AnalyticsDashboard />
    </HydrationBoundary>
  )
}

export default AnalyticsPage
