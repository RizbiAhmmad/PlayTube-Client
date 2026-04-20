"use client"

import { ColumnDef } from "@tanstack/react-table"
import { IUser } from "@/types/user.types"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import Image from "next/image"
import { UserActions } from "./UserActions"

export const userColumns: ColumnDef<IUser>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "User",
    cell: ({ row }) => {
      const user = row.original
      return (
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full border bg-muted">
            {user.image ? (
              <Image src={user.image} alt={user.name} fill className="object-cover" />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-bold text-muted-foreground uppercase">
                {user.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => {
      const role = row.getValue("role") as string
      return (
        <Badge
          variant={role === "SUPER_ADMIN" ? "default" : role === "ADMIN" ? "secondary" : "outline"}
          className="font-bold text-[10px] uppercase tracking-wider"
        >
          {role}
        </Badge>
      )
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string
      return (
        <Badge
          variant={status === "ACTIVE" ? "success" : "destructive"}
          className="font-bold text-[10px] uppercase tracking-wider"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => {
      return <span className="text-sm">{new Date(row.original.createdAt).toLocaleDateString()}</span>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <UserActions user={row.original} />,
  },
]
