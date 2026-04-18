"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { getAllReviews } from "@/services/review.services"
import { PaginationMeta } from "@/types/api.types"
import { type IReview } from "@/services/review.services"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import DeleteReviewConfirmationDialog from "./DeleteReviewConfirmationDialog"
import UpdateReviewStatusDialog from "./UpdateReviewStatusDialog"
import { reviewColumns } from "./reviewColumns"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const ReviewTable = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams()
  const {
    editingItem,
    deletingItem,
    isEditModalOpen,
    isDeleteDialogOpen,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IReview>({ enableView: false })

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  })

  const queryString = queryStringFromUrl || initialQueryString
  // parse the query string manually to pass it as record
  const params: Record<string, string> = {}
  new URLSearchParams(queryString).forEach((val, key) => {
     params[key] = val
  })

  const { data: reviewResponse, isLoading, isFetching } = useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getAllReviews(params),
  })

  const reviewList = reviewResponse?.data ?? []
  const meta: PaginationMeta | undefined = reviewResponse?.meta
  
  return (
    <>
      <DataTable
        data={reviewList}
        columns={reviewColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No reviews found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        meta={meta}
        actions={tableActions}
      />

      <UpdateReviewStatusDialog
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        review={editingItem}
      />

      <DeleteReviewConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        review={deletingItem}
      />
    </>
  )
}

export default ReviewTable
