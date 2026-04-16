import MediaTable from "@/components/modules/Admin/MediaManagement/MediaTable"
import { getMediaList } from "@/services/media.services"
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query"

const MediaManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const queryParamsObjects = await searchParams

  const queryString = Object.keys(queryParamsObjects)
    .map((key) => {
      const value = queryParamsObjects[key]

      if (value === undefined) {
        return ""
      }

      if (Array.isArray(value)) {
        return value
          .map((item) => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join("&")
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .filter(Boolean)
    .join("&")

  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["media", queryString],
    queryFn: () => getMediaList(queryString),
  })

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Management</h1>
          <p className="text-muted-foreground">
            Upload and manage images for your platform.
          </p>
        </div>
      </div>

      <HydrationBoundary state={dehydrate(queryClient)}>
        <MediaTable initialQueryString={queryString} />
      </HydrationBoundary>
    </div>
  )
}

export default MediaManagementPage
