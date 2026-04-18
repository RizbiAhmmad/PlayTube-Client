import SalesTable from "@/components/modules/Admin/SalesManagement/SalesTable"
import { getAllPayments } from "@/services/payment.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const SalesManagementPage = async () => {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["all-payments"],
    queryFn: () => getAllPayments(),
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Management</h1>
          <p className="text-muted-foreground">
            Track all media sales, rentals, and subscriptions.
          </p>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <SalesTable />
      </HydrationBoundary>
    </div>
  )
}

export default SalesManagementPage
