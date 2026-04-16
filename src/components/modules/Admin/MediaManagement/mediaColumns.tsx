import DateCell from "@/components/shared/cell/DateCell"
import { Badge } from "@/components/ui/badge"
import { type IMedia } from "@/types/media.types"
import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"

export const mediaColumns: ColumnDef<IMedia>[] = [
  {
    id: "thumbnail",
    header: "Thumb",
    cell: ({ row }) => (
      <div className="relative aspect-video w-16 overflow-hidden rounded border bg-muted">
        <Image
          src={row.original.thumbnail}
          alt={row.original.title}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
  {
    id: "title",
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-medium">{row.original.title}</span>
        <span className="text-xs text-muted-foreground">{row.original.director}</span>
      </div>
    )
  },
  {
    id: "type",
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant="outline" className="text-[10px] uppercase">{row.original.type}</Badge>
    )
  },
  {
    id: "releaseYear",
    accessorKey: "releaseYear",
    header: "Year",
  },
  {
    id: "pricingType",
    accessorKey: "pricingType",
    header: "Pricing",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <Badge variant={row.original.pricingType === "FREE" ? "secondary" : "default"}>
          {row.original.pricingType}
        </Badge>
        {row.original.price && <span className="text-sm">${row.original.price}</span>}
      </div>
    )
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => {
      if (!row.original.createdAt) {
        return <span className="text-sm text-muted-foreground">N/A</span>
      }
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />
    },
  },
]
