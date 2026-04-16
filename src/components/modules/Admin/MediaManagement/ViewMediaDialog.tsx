"use client"

import { getMediaByIdAction } from "@/app/(dashboardLayout)/admin/dashboard/media-management/_action"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { type ApiResponse } from "@/types/api.types"
import { type IMedia } from "@/types/media.types"
import { useQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import Image from "next/image"

interface ViewMediaDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: IMedia | null
}

const formatDateTime = (value?: string | Date | null) => {
  if (!value) return "N/A"
  const dateValue = new Date(value)
  if (Number.isNaN(dateValue.getTime())) return "N/A"
  return format(dateValue, "MMM dd, yyyy hh:mm a")
}

const ViewMediaDialog = ({
  open,
  onOpenChange,
  media,
}: ViewMediaDialogProps) => {
  const mediaId = media?.id ?? ""

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ["media-details", mediaId],
    queryFn: () => getMediaByIdAction(mediaId),
    enabled: open && !!mediaId,
    staleTime: 1000 * 60,
  })

  const hasError = data && !data.success
  const mediaDetails = data && data.success
    ? { ...media, ...(data as ApiResponse<IMedia>).data }
    : media

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] w-[calc(100vw-1.5rem)] max-w-4xl gap-0 overflow-hidden p-0">
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle>Media Details</DialogTitle>
          <DialogDescription>
            Comprehensive view of movie/series metadata and links.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="max-h-[calc(90vh-5.5rem)]">
          <div className="space-y-6 px-6 py-5">
            {(isLoading || isFetching) && (
              <div className="rounded-md border p-4 text-sm text-muted-foreground animate-pulse text-center">
                Loading media details...
              </div>
            )}

            {hasError && (
              <div className="rounded-md border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
                {data.message || "Failed to load media details."}
              </div>
            )}

            {!isLoading && !isFetching && mediaDetails && (
              <div className="grid gap-6 md:grid-cols-3">
                {/* Left Column: Thumbnail & Actions */}
                <div className="md:col-span-1 space-y-4">
                  <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg border bg-muted shadow-sm">
                    <Image
                      src={mediaDetails.thumbnail}
                      alt={mediaDetails.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Badge variant={mediaDetails.pricingType === "FREE" ? "secondary" : "default"} className="justify-center py-1">
                      {mediaDetails.pricingType} {mediaDetails.price ? `($${mediaDetails.price})` : ""}
                    </Badge>
                    <Badge variant="outline" className="justify-center py-1">
                      {mediaDetails.type}
                    </Badge>
                  </div>
                </div>

                {/* Right Column: Metadata */}
                <div className="md:col-span-2 space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold">{mediaDetails.title}</h2>
                    <p className="text-sm text-muted-foreground mt-1">
                      Released: {mediaDetails.releaseYear} | Directed by {mediaDetails.director}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Description</h3>
                    <p className="text-sm leading-relaxed text-foreground/80">{mediaDetails.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Genres</h3>
                      <div className="flex flex-wrap gap-1">
                        {mediaDetails.genres.map((genre) => (
                          <Badge key={genre} variant="secondary" className="font-normal">{genre}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Cast</h3>
                      <p className="text-sm text-foreground/80">{mediaDetails.cast.join(", ")}</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-4 border-t">
                    <div className="grid gap-2 text-sm">
                      <p><span className="font-medium text-muted-foreground">Streaming URL:</span> <a href={mediaDetails.streamingUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline break-all">{mediaDetails.streamingUrl}</a></p>
                      {mediaDetails.trailerUrl && (
                        <p><span className="font-medium text-muted-foreground">Trailer URL:</span> <a href={mediaDetails.trailerUrl} target="_blank" rel="noreferrer" className="text-primary hover:underline break-all">{mediaDetails.trailerUrl}</a></p>
                      )}
                      <p><span className="font-medium text-muted-foreground">Added On:</span> {formatDateTime(mediaDetails.createdAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

export default ViewMediaDialog
