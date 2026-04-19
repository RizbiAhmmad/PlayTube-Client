"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getCommentsByReview, createComment, IComment, deleteComment } from "@/services/comment.services"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { format } from "date-fns"
import { Loader2, Reply, Send, Trash2 } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"

interface CommentSectionProps {
  reviewId: string
  currentUserId?: string
}

const CommentSection = ({ reviewId, currentUserId }: CommentSectionProps) => {
  const [content, setContent] = useState("")
  const queryClient = useQueryClient()

  const { data: commentsResponse, isLoading } = useQuery({
    queryKey: ["review-comments", reviewId],
    queryFn: () => getCommentsByReview(reviewId),
  })

  const comments = commentsResponse?.data || []

  const { mutate: handleCreateComment, isPending } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setContent("")
      queryClient.invalidateQueries({ queryKey: ["review-comments", reviewId] })
      toast.success("Comment added!")
    },
    onError: () => {
      toast.error("Failed to add comment")
    }
  })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentUserId) {
      toast.error("Please login to comment")
      return
    }
    if (!content.trim()) return
    handleCreateComment({ content, reviewId })
  }

  return (
    <div className="mt-6 space-y-6 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="space-y-4 pt-4">
        <h4 className="text-sm font-bold text-muted-foreground flex items-center gap-2">
          Discussion ({comments.length})
        </h4>
        
        {/* Comment Form */}
        <form onSubmit={onSubmit} className="relative">
          <Textarea
            placeholder="Write a comment..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] rounded-2xl bg-muted/30 border-muted-foreground/10 focus-visible:ring-primary/20 resize-none p-4 pb-12"
          />
          <div className="absolute bottom-3 right-3">
            <Button 
                type="submit" 
                size="sm" 
                disabled={!content.trim() || isPending || !currentUserId}
                className="rounded-full gap-2 px-4"
            >
              {isPending ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
              Post
            </Button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex justify-center py-6">
            <Loader2 className="size-6 animate-spin text-primary/40" />
          </div>
        ) : comments.length === 0 ? (
          <p className="text-sm text-center text-muted-foreground py-6 italic">No comments yet. Start the conversation!</p>
        ) : (
          comments.map((comment: IComment) => (
            <CommentItem 
              key={comment.id} 
              comment={comment} 
              currentUserId={currentUserId} 
              reviewId={reviewId}
            />
          ))
        )}
      </div>
    </div>
  )
}

const CommentItem = ({ comment, currentUserId, reviewId, isReply = false }: { 
  comment: IComment, 
  currentUserId?: string, 
  reviewId: string,
  isReply?: boolean 
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [replyContent, setReplyContent] = useState("")
  const queryClient = useQueryClient()

  const { mutate: handleReply, isPending: isReplying } = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setReplyContent("")
      setShowReplyForm(false)
      queryClient.invalidateQueries({ queryKey: ["review-comments", reviewId] })
      toast.success("Reply added!")
    },
    onError: () => {
      toast.error("Failed to add reply")
    }
  })

  const { mutate: handleDelete, isPending: isDeleting } = useMutation({
    mutationFn: () => deleteComment(comment.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["review-comments", reviewId] })
      toast.success("Comment deleted")
    },
    onError: () => {
      toast.error("Failed to delete comment")
    }
  })

  const onReplySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!replyContent.trim()) return
    handleReply({ content: replyContent, reviewId, parentId: comment.id })
  }

  return (
    <div className={cn("space-y-3", isReply && "ml-10 pt-2")}>
      <div className="flex gap-3 group/comment">
        <Avatar className={cn("border-2 border-background ring-1 ring-primary/5", isReply ? "size-8" : "size-10")}>
          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user?.email}`} />
          <AvatarFallback>{comment.user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold">{comment.user?.name}</p>
            <span className="text-[10px] text-muted-foreground font-medium">
              {format(new Date(comment.createdAt), "MMM dd, HH:mm")}
            </span>
          </div>
          <div className={cn(
            "p-3 rounded-2xl rounded-tl-none bg-muted/40 border border-muted-foreground/5 text-sm leading-relaxed",
            isReply ? "bg-muted/20" : "bg-muted/40"
          )}>
            {comment.content}
          </div>
          
          <div className="flex items-center gap-4 px-1">
            {!isReply && currentUserId && (
              <button 
                onClick={() => setShowReplyForm(!showReplyForm)}
                className="text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
              >
                <Reply className="size-3" />
                Reply
              </button>
            )}
            {currentUserId === comment.userId && (
               <button 
                onClick={() => handleDelete()}
                disabled={isDeleting}
                className="text-[11px] font-bold text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
              >
                {isDeleting ? <Loader2 className="size-3 animate-spin" /> : <Trash2 className="size-3" />}
                Delete
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Reply Form */}
      {showReplyForm && (
        <form onSubmit={onReplySubmit} className="ml-10 space-y-2 animate-in slide-in-from-top-2 duration-200">
           <Textarea
            placeholder={`Reply to ${comment.user?.name}...`}
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[80px] rounded-xl bg-muted/20 border-muted-foreground/10 focus-visible:ring-primary/10 resize-none p-3 text-sm"
          />
          <div className="flex justify-end gap-2">
             <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowReplyForm(false)}
                className="rounded-full text-xs h-8"
            >
              Cancel
            </Button>
            <Button 
                type="submit" 
                size="sm" 
                disabled={!replyContent.trim() || isReplying}
                className="rounded-full text-xs h-8 gap-2"
            >
              {isReplying ? <Loader2 className="size-3 animate-spin" /> : <Send className="size-3" />}
              Reply
            </Button>
          </div>
        </form>
      )}

      {/* Nested Replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="space-y-3 relative before:absolute before:left-4 before:top-2 before:bottom-2 before:w-[1px] before:bg-muted-foreground/10">
          {comment.replies.map((reply) => (
            <CommentItem 
              key={reply.id} 
              comment={reply} 
              currentUserId={currentUserId} 
              reviewId={reviewId}
              isReply={true}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default CommentSection
