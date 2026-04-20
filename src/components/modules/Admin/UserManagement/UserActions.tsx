"use client"

import { IUser } from "@/types/user.types"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash2, UserCog, ShieldAlert } from "lucide-react"
import { toast } from "sonner"
import { changeUserRole, changeUserStatus, deleteUser } from "@/services/admin.services"
import { useQueryClient } from "@tanstack/react-query"

interface UserActionsProps {
  user: IUser
}

export const UserActions = ({ user }: UserActionsProps) => {
  const queryClient = useQueryClient()

  const handleUpdateRole = async (role: string) => {
    const res = await changeUserRole(user.id, role)
    if (res.success) {
      toast.success(`User role updated to ${role}`)
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    } else {
      toast.error(res.message || "Something went wrong")
    }
  }

  const handleUpdateStatus = async (status: string) => {
    const res = await changeUserStatus(user.id, status)
    if (res.success) {
      toast.success(`User status updated to ${status}`)
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    } else {
      toast.error(res.message || "Something went wrong")
    }
  }

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) return
    const res = await deleteUser(user.id)
    if (res.success) {
      toast.success("User deleted successfully")
      queryClient.invalidateQueries({ queryKey: ["admin-users"] })
    } else {
      toast.error(res.message || "Something went wrong")
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center gap-2">
          <UserCog className="size-3" /> Change Role
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleUpdateRole("USER")}>Set as User</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateRole("ADMIN")}>Set as Admin</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs text-muted-foreground flex items-center gap-2">
          <ShieldAlert className="size-3" /> Change Status
        </DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleUpdateStatus("ACTIVE")}>Set as Active</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleUpdateStatus("BLOCKED")}>Set as Blocked</DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive focus:bg-destructive focus:text-destructive-foreground">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete User
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
