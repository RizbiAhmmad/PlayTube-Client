/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteMyReview, type IReview } from "@/services/review.services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DeleteReviewConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: IReview | null
}

const DeleteReviewConfirmationDialog = ({
  open,
  onOpenChange,
  review,
}: DeleteReviewConfirmationDialogProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (id: string) => {
       const result = await deleteMyReview(id);
       return result;
    },
  })

  const handleConfirmDelete = async () => {
    if (!review) {
      toast.error("Review not found")
      return
    }

    try {
       const result = await mutateAsync(review.id)

       if (!result.success) {
         toast.error(result.message || "Failed to delete review")
         return
       }

       toast.success(result.message || "Review deleted successfully")
       onOpenChange(false)

       void queryClient.invalidateQueries({ queryKey: ["reviews"] })
       router.refresh()
    } catch (error: any) {
       toast.error(error?.response?.data?.message || "Failed to delete review")
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Review</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this review? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(event) => {
              event.preventDefault()
              void handleConfirmDelete()
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteReviewConfirmationDialog
