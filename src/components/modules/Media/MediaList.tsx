"use client"

import { useServerManagedDataTable } from "@/hooks/useServerManagedDataTable"
import {
  serverManagedFilter,
  useServerManagedDataTableFilters,
} from "@/hooks/useServerManagedDataTableFilters"
import { useServerManagedDataTableSearch } from "@/hooks/useServerManagedDatatableSearch"
import { getMediaList } from "@/services/media.services"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"
import MediaCard from "./MediaCard"
import DataTableSearch from "@/components/shared/table/DataTableSearch"
import DataTableFilters, { DataTableFilterConfig, DataTableFilterValues } from "@/components/shared/table/DataTableFilters"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { RefreshCcw } from "lucide-react"

const DEFAULT_PAGE = 1
const DEFAULT_LIMIT = 12

const MEDIA_ALLOWED_QUERY_KEYS = new Set([
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "searchTerm",
  "type",
  "pricingType",
])

const MEDIA_FILTER_DEFINITIONS = [
  serverManagedFilter.single("type"),
  serverManagedFilter.single("pricingType"),
]

const getSanitizedMediaQueryString = (queryString: string) => {
  const currentParams = new URLSearchParams(queryString)
  const sanitizedParams = new URLSearchParams()

  currentParams.forEach((value, key) => {
    if (!MEDIA_ALLOWED_QUERY_KEYS.has(key)) {
      return
    }

    const normalizedValue = value.trim()
    if (!normalizedValue) {
      return
    }

    sanitizedParams.set(key, normalizedValue)
  })

  return sanitizedParams.toString()
}

const Pagination = ({
  currentPage,
  totalPages,
  isLoading,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  isLoading: boolean
  onPageChange: (page: number) => void
}) => {
  if (totalPages <= 1) return null

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-8">
      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isLoading || currentPage <= 1}
      >
        Prev
      </Button>

      {pageNumbers.map((page) => (
        <Button
          key={page}
          type="button"
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          disabled={isLoading}
        >
          {page}
        </Button>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isLoading || currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  )
}

const MediaList = ({ initialQueryString }: { initialQueryString: string }) => {
  const searchParams = useSearchParams()

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

  const queryString = useMemo(() => {
    return getSanitizedMediaQueryString(queryStringFromUrl || initialQueryString)
  }, [initialQueryString, queryStringFromUrl])

  const {
    searchTermFromUrl,
    handleDebouncedSearchChange,
  } = useServerManagedDataTableSearch({
    searchParams,
    updateParams,
  })

  const {
    filterValues,
    handleFilterChange,
    clearAllFilters,
  } = useServerManagedDataTableFilters({
    searchParams,
    definitions: MEDIA_FILTER_DEFINITIONS,
    updateParams,
  })

  const { data: mediaResponse, isLoading, isFetching } = useQuery({
    queryKey: ["media", queryString],
    queryFn: () => getMediaList(queryString),
  })

  const medias = mediaResponse?.data ?? []
  const meta = mediaResponse?.meta

  const filterConfigs = useMemo<DataTableFilterConfig[]>(() => [
    {
      id: "type",
      label: "Format",
      type: "single-select",
      options: [
        { label: "Movies", value: "MOVIE" },
        { label: "Series", value: "SERIES" },
      ],
    },
    {
      id: "pricingType",
      label: "Pricing",
      type: "single-select",
      options: [
        { label: "Free", value: "FREE" },
        { label: "Premium", value: "PREMIUM" },
      ],
    },
  ], [])

  const filterValuesForControls = useMemo<DataTableFilterValues>(() => ({
    type: filterValues.type,
    pricingType: filterValues.pricingType,
  }), [filterValues])

  const isBusy = isLoading || isFetching || isRouteRefreshPending

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Search and Header Section */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">
            Browse <span className="text-primary">Media</span>
          </h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Showing {meta?.total || medias.length} items.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
            <div className="w-full md:w-80">
              <DataTableSearch
                key={searchTermFromUrl}
                initialValue={searchTermFromUrl}
                placeholder="Search movies & series..."
                onDebouncedChange={handleDebouncedSearchChange}
                isLoading={isBusy}
              />
            </div>
            
            <DataTableFilters
              filters={filterConfigs}
              values={filterValuesForControls}
              onFilterChange={handleFilterChange}
              onClearAll={clearAllFilters}
              isLoading={isBusy}
            />

            <Select
              value={optimisticSortingState[0]?.id ? `${optimisticSortingState[0]?.id}:${optimisticSortingState[0]?.desc ? "desc" : "asc"}` : "default"}
              onValueChange={(value) => {
                if (value === "default") {
                  handleSortingChange([])
                  return
                }
                const [sortBy, sortOrder] = value.split(":")
                handleSortingChange([{ id: sortBy, desc: sortOrder === "desc" }])
              }}
            >
              <SelectTrigger className="w-44 h-11" disabled={isBusy}>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="releaseYear:desc">Newest First</SelectItem>
                <SelectItem value="price:asc">Price (Low to High)</SelectItem>
                <SelectItem value="title:asc">A-Z</SelectItem>
              </SelectContent>
            </Select>
        </div>
      </div>

      {/* Media Grid */}
      {medias.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:gap-8">
            {medias.map((media) => (
              <MediaCard key={media.id} media={media} />
            ))}
          </div>

          <Pagination
            currentPage={optimisticPaginationState.pageIndex + 1}
            totalPages={meta?.totalPages ?? 1}
            isLoading={isBusy}
            onPageChange={(page) => {
              handlePaginationChange({
                pageIndex: page - 1,
                pageSize: optimisticPaginationState.pageSize,
              })
            }}
          />
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border bg-muted/30 p-10 text-center">
            <h3 className="text-xl font-bold">No results found {isBusy && "(Loading...)"}</h3>
            <p className="mt-2 text-muted-foreground">
              Try adjusting your search or filters to find what you are looking for.
            </p>
            <Button variant="outline" className="mt-6 gap-2" onClick={clearAllFilters}>
              <RefreshCcw className="size-4" />
              Reset All Filters
            </Button>
        </div>
      )}
    </div>
  )
}

export default MediaList
