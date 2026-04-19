"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getReviewsByMedia, IReview } from "@/services/review.services"
import { getLikesByReview, toggleLike, ILike } from "@/services/like.services"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Star, MessageSquare, ThumbsUp, Calendar, AlertTriangle, Eye, Loader2 } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import CommentSection from "./CommentSection"

interface ReviewListProps {
  mediaId: string
  currentUserId?: string
}

const ReviewList = ({ mediaId, currentUserId }: ReviewListProps) => {
  const { data: reviewsResponse, isLoading } = useQuery({
    queryKey: ["media-reviews", mediaId],
    queryFn: () => getReviewsByMedia(mediaId),
  })

  const reviews = reviewsResponse?.data || []

  if (isLoading) {
    return (
      <div className="space-y-6">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-4 rounded-2xl border p-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <Skeleton className="h-20 w-full rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  if (reviews.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-muted/20 rounded-3xl border border-dashed text-center">
        <MessageSquare className="size-12 text-muted-foreground/30 mb-4" />
        <h3 className="text-xl font-bold">No reviews yet</h3>
        <p className="text-muted-foreground max-w-xs">Be the first to share your experience with this title!</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          Community Reviews 
          <span className="text-sm font-medium text-muted-foreground bg-muted px-2.5 py-0.5 rounded-full">
            {reviews.length}
          </span>
        </h3>
      </div>
      
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} currentUserId={currentUserId} />
      ))}
    </div>
  )
}

const ReviewCard = ({ review, currentUserId }: { review: IReview, currentUserId?: string }) => {
  const queryClient = useQueryClient()
  const [showSpoiler, setShowSpoiler] = useState(false)
  const isSpoiler = review.spoiler && !showSpoiler

  const { data: likesResponse, isLoading: isLoadingLikes } = useQuery({
    queryKey: ["review-likes", review.id],
    queryFn: () => getLikesByReview(review.id),
  })

  const likes = likesResponse?.data || []
  const isLikedByMe = currentUserId ? likes.some((like: ILike) => like.userId === currentUserId) : false

  const { mutate: handleLikeToggle, isPending: isToggling } = useMutation({
    mutationFn: () => toggleLike(review.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-likes", review.id] })
    },
    onError: () => {
      toast.error("Failed to update like status")
    }
  })

  const onLikeClick = () => {
    if (!currentUserId) {
      toast.error("You must be logged in to like a review")
      return
    }
    handleLikeToggle()
  }

  const [showComments, setShowComments] = useState(false)

  return (
    <div className="relative group rounded-3xl border bg-card/50 p-6 shadow-sm transition-all hover:shadow-md hover:border-primary/20">
      <div className="flex flex-col gap-5">
        {/* User Info & Rating */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-background ring-2 ring-primary/10">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${review.user?.email}`} />
              <AvatarFallback>{review.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold text-base">{review.user?.name}</p>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                <span>{format(new Date(review.createdAt), "MMMM dd, yyyy")}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
            <div className="flex items-center gap-1 bg-amber-400/10 text-amber-600 px-3 py-1 rounded-full font-black text-sm">
                <Star className="size-4 fill-current" />
                <span>{review.rating}/10</span>
            </div>
            {review.spoiler && (
              <Badge variant="destructive" className="text-[10px] h-5 px-1.5 font-bold uppercase tracking-wider">
                Spoiler
              </Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="relative">
          {isSpoiler ? (
            <div className="flex flex-col items-center justify-center py-10 px-6 rounded-2xl bg-destructive/5 border border-destructive/20 text-center space-y-3">
              <div className="size-10 rounded-full bg-destructive/10 flex items-center justify-center">
                 <AlertTriangle className="size-5 text-destructive" />
              </div>
              <div>
                 <p className="text-sm font-bold text-destructive">Caution: This review contains spoilers!</p>
                 <p className="text-xs text-muted-foreground mt-1">Plot reveals ahead. View at your own risk.</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setShowSpoiler(true)}
                className="rounded-full border-destructive/30 hover:bg-destructive hover:text-white transition-all gap-2"
              >
                <Eye className="size-4" />
                Show Content
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
               <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {review.content}
              </p>

              {/* Tags */}
              {review.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {review.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-primary/60 bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {!isSpoiler && (
           <div className="flex flex-col">
            <div className="flex items-center gap-6 pt-4 border-t border-muted/50">
                <button 
                  onClick={onLikeClick}
                  disabled={isToggling}
                  className={cn("flex items-center gap-2 transition-colors", 
                    isLikedByMe ? "text-primary hover:text-primary/80" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  {isToggling ? <Loader2 className="size-4 animate-spin" /> : <ThumbsUp className={cn("size-4", isLikedByMe && "fill-current")} />}
                  <span className="text-xs font-bold">{isLoadingLikes ? "-" : likes.length}</span>
                </button>
                <button 
                  onClick={() => setShowComments(!showComments)}
                  className={cn("flex items-center gap-2 transition-colors",
                    showComments ? "text-primary" : "text-muted-foreground hover:text-primary"
                  )}
                >
                  <MessageSquare className={cn("size-4", showComments && "fill-current")} />
                  <span className="text-xs font-bold">{review._count?.comments || 0}</span>
                </button>
            </div>

            {showComments && (
              <CommentSection reviewId={review.id} currentUserId={currentUserId} />
            )}
           </div>
        )}
      </div>
    </div>
  )
}


export default ReviewList
