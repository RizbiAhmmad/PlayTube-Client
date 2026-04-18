/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { updateReviewStatus, type IReview } from "@/services/review.services"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { toast } from "sonner"

interface UpdateReviewStatusDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  review: IReview | null
}

const UpdateReviewStatusDialog = ({
  open,
  onOpenChange,
  review,
}: UpdateReviewStatusDialogProps) => {
  const queryClient = useQueryClient()
  const [status, setStatus] = useState<"APPROVED" | "REJECTED" | "PENDING">("PENDING")
  const [currentReviewId, setCurrentReviewId] = useState<string | undefined>(undefined)

  if (review?.id !== currentReviewId) {
    setCurrentReviewId(review?.id)
    setStatus(review?.status || "PENDING")
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      if (!review) throw new Error("No review selected")
      if (status === "PENDING") throw new Error("Status cannot be PENDING")
      return updateReviewStatus(review.id, status as "APPROVED" | "REJECTED")
    },
    onSuccess: () => {
      toast.success("Review status updated successfully")
      queryClient.invalidateQueries({ queryKey: ["reviews"] })
      onOpenChange(false)
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to update review status"
      toast.error(message)
    },
  })

  if (!review) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Review Status</DialogTitle>
          <DialogDescription>
            Change the status of this review. This action will determine if the review is visible to the public.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="rounded-md bg-muted p-3 text-sm">
             <span className="font-semibold block mb-1">Review Content:</span>
             <p className="line-clamp-3 text-muted-foreground">{review.content}</p>
          </div>

          <RadioGroup 
             value={status} 
             onValueChange={(val) => setStatus(val as "APPROVED" | "REJECTED" | "PENDING")}
             className="flex flex-col space-y-2 mt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="PENDING" id="r1" disabled />
              <Label htmlFor="r1" className="text-muted-foreground">Pending (Current: {status === "PENDING" ? "Yes" : "No"})</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="APPROVED" id="r2" />
              <Label htmlFor="r2" className="cursor-pointer">Approved (Visible to public)</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="REJECTED" id="r3" />
              <Label htmlFor="r3" className="cursor-pointer text-destructive">Rejected (Hidden from public)</Label>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <Button 
             onClick={() => mutate()} 
             disabled={isPending || status === "PENDING" || status === review.status}
          >
            {isPending ? "Updating..." : "Update Status"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateReviewStatusDialog
