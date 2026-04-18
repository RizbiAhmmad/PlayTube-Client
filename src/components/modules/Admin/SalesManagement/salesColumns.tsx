import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { IPayment } from "@/types/dashboard.types"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const salesColumns: ColumnDef<IPayment>[] = [
  {
    id: "media",
    header: "Media",
    cell: ({ row }) => {
        const media = row.original.media;
        return (
            <div className="flex items-center gap-3">
                <div className="relative aspect-video w-12 overflow-hidden rounded border bg-muted">
                   {media?.thumbnail && (
                     <Image
                     src={media.thumbnail}
                     alt={media.title || "Media"}
                     fill
                     className="object-cover"
                   />
                   )}
                </div>
                <div className="flex flex-col">
                    <span className="font-medium">{media?.title || "N/A"}</span>
                </div>
            </div>
        )
    },
  },
  {
    id: "user",
    header: "Customer",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.user?.name || "Unknown"}</span>
        <span className="text-xs text-muted-foreground">{row.original.user?.email}</span>
      </div>
    )
  },
  {
    id: "transactionId",
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
        <span className="text-xs font-mono">{row.original.transactionId || "N/A"}</span>
    )
  },
  {
    id: "paymentType",
    accessorKey: "paymentType",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-[10px] uppercase">{row.original.paymentType}</Badge>
    )
  },
  {
    id: "amount",
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
       <span className="font-semibold text-green-600">${row.original.amount.toFixed(2)}</span>
    )
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant={row.original.status === "PAID" ? "default" : "destructive"}>
        {row.original.status}
      </Badge>
    )
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy HH:mm" />
    },
  },
]
