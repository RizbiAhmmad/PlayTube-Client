"use client"

import { deleteMediaAction } from "@/app/(dashboardLayout)/admin/dashboard/media-management/_action"
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
import { type IMedia } from "@/types/media.types"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

interface DeleteMediaConfirmationDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  media: IMedia | null
}

const DeleteMediaConfirmationDialog = ({
  open,
  onOpenChange,
  media,
}: DeleteMediaConfirmationDialogProps) => {
  const queryClient = useQueryClient()
  const router = useRouter()

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteMediaAction,
  })

  const handleConfirmDelete = async () => {
    if (!media) {
      toast.error("Media not found")
      return
    }

    const result = await mutateAsync(media.id)

    if (!result.success) {
      toast.error(result.message || "Failed to delete media")
      return
    }

    toast.success(result.message || "Media deleted successfully")
    onOpenChange(false)

    void queryClient.invalidateQueries({ queryKey: ["media"] })
    router.refresh()
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Media</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{media?.title}</strong>? This action cannot be undone.
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

export default DeleteMediaConfirmationDialog
