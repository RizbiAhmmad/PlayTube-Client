import MediaList from "@/components/modules/Media/MediaList"
import { getMediaList } from "@/services/media.services"
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query"

const MEDIA_ALLOWED_QUERY_KEYS = new Set([
  "page",
  "limit",
  "sortBy",
  "sortOrder",
  "searchTerm",
  "type",
  "pricingType",
  "genres",
])

const MediaPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const queryParamsObjects = await searchParams

  const normalizedQueryParams = new URLSearchParams()

  Object.keys(queryParamsObjects).forEach((key) => {
    if (!MEDIA_ALLOWED_QUERY_KEYS.has(key)) {
      return
    }

    const rawValue = queryParamsObjects[key]
    if (rawValue === undefined) {
      return
    }

    if (Array.isArray(rawValue)) {
      rawValue.forEach((value) => {
        const normalizedValue = value.trim()
        if (normalizedValue) {
          normalizedQueryParams.append(key, normalizedValue)
        }
      })
      return
    }

    const normalizedValue = rawValue.trim()
    if (normalizedValue) {
      normalizedQueryParams.set(key, normalizedValue)
    }
  })

  const queryString = normalizedQueryParams.toString()
  const queryClient = new QueryClient()

  // Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: ["media", queryString],
    queryFn: () => getMediaList(queryString),
  })

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
        <MediaList initialQueryString={queryString} />
    </HydrationBoundary>
  )
}

export default MediaPage