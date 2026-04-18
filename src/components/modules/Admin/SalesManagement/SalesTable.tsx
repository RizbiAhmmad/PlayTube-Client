"use client"

import DataTable from "@/components/shared/table/DataTable"
import { getAllPayments } from "@/services/payment.services"
import { useQuery } from "@tanstack/react-query"
import { salesColumns } from "./salesColumns"

const SalesTable = () => {
  const { data: salesResponse, isLoading, isFetching } = useQuery({
    queryKey: ["all-payments"],
    queryFn: () => getAllPayments(),
  })
  
  const salesList = salesResponse?.data ?? []

  return (
      <DataTable
        data={salesList}
        columns={salesColumns}
        isLoading={isLoading || isFetching}
        emptyMessage="No sales found."
      />
  )
}

export default SalesTable
