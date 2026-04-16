"use client"

import DataTable from "@/components/shared/table/DataTable"
import { useRowActionModalState } from "@/hooks/useRowActionModalState"
import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDatatableSearch"
import { getMediaList } from "@/services/media.services"
import { PaginationMeta } from "@/types/api.types"
import { type IMedia } from "@/types/media.types"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import CreateMediaFormModal from "./CreateMediaFormModal"
import DeleteMediaConfirmationDialog from "./DeleteMediaConfirmationDialog"
import EditMediaFormModal from "./EditMediaFormModal"
import ViewMediaDialog from "./ViewMediaDialog"
import { mediaColumns } from "./mediaColumns"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 10

const MediaTable = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams()
  const {
    viewingItem,
    editingItem,
    deletingItem,
    isViewDialogOpen,
    isEditModalOpen,
    isDeleteDialogOpen,
    onViewOpenChange,
    onEditOpenChange,
    onDeleteOpenChange,
    tableActions,
  } = useRowActionModalState<IMedia>()

  const {
    queryStringFromUrl,
    optimisticSortingState,
    optimisticPaginationState,
    isRouteRefreshPending,
    updateParams,
    handleSortingChange,
    handlePaginationChange,
  } = useServerManagedDataTable({
    searchParams,
    defaultPage: DEFAULT_PAGE,
    defaultLimit: DEFAULT_LIMIT,
  })

  const queryString = queryStringFromUrl || initialQueryString

  const {
    searchTermFromUrl,
    handleDebouncedSearchChange,
  } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  })

  const { data: mediaResponse, isLoading, isFetching } = useQuery({
    queryKey: ["media", queryString],
    queryFn: () => getMediaList(queryString),
  })

  const mediaList = mediaResponse?.data ?? []
  const meta: PaginationMeta | undefined = mediaResponse?.meta

  return (
    <>
      <DataTable
        data={mediaList}
        columns={mediaColumns}
        isLoading={isLoading || isFetching || isRouteRefreshPending}
        emptyMessage="No media found."
        sorting={{
          state: optimisticSortingState,
          onSortingChange: handleSortingChange,
        }}
        pagination={{
          state: optimisticPaginationState,
          onPaginationChange: handlePaginationChange,
        }}
        search={{
          initialValue: searchTermFromUrl,
          placeholder: "Search media by file name...",
          debounceMs: 700,
          onDebouncedChange: handleDebouncedSearchChange,
        }}
        toolbarAction={<CreateMediaFormModal />}
        meta={meta}
        actions={tableActions}
      />

      <EditMediaFormModal
        open={isEditModalOpen}
        onOpenChange={onEditOpenChange}
        media={editingItem}
      />

      <DeleteMediaConfirmationDialog
        open={isDeleteDialogOpen}
        onOpenChange={onDeleteOpenChange}
        media={deletingItem}
      />
      
      <ViewMediaDialog
        open={isViewDialogOpen}
        onOpenChange={onViewOpenChange}
        media={viewingItem}
      />
    </>
  )
}

export default MediaTable
