import DateCell from "@/components/shared/cell/DateCell";
import { Badge } from "@/components/ui/badge";
import { IReview } from "@/services/review.services";
import { ColumnDef } from "@tanstack/react-table";
import { Star } from "lucide-react";
import Image from "next/image";

export const reviewColumns: ColumnDef<IReview>[] = [
  {
    id: "media",
    header: "Media",
    cell: ({ row }) => {
      const media = row.original.media;
      if (!media) return <span className="text-muted-foreground text-sm">Deleted Media</span>;

      return (
        <div className="flex items-center gap-3">
          {media.thumbnail ? (
            <div className="relative aspect-video w-12 overflow-hidden rounded border bg-muted">
              <Image
                src={media.thumbnail}
                alt={media.title}
                fill
                sizes="48px"
                className="object-cover"
              />
            </div>
          ) : (
             <div className="relative aspect-video w-12 overflow-hidden rounded border bg-muted flex items-center justify-center">
                <span className="text-[10px] text-muted-foreground uppercase">{media.type}</span>
             </div>
          )}
          <span className="font-medium text-sm line-clamp-1 max-w-[150px]">{media.title}</span>
        </div>
      );
    },
  },
  {
    id: "user",
    header: "User",
    cell: ({ row }) => {
      const user = row.original.user;
      if (!user) return <span className="text-muted-foreground text-sm">Deleted User</span>;
      return (
         <div className="flex flex-col">
            <span className="font-medium text-sm">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
         </div>
      );
    }
  },
  {
    id: "rating",
    accessorKey: "rating",
    header: "Rating",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm font-medium">
        <Star className="h-4 w-4 fill-primary text-primary" />
        <span>{row.original.rating}</span>
      </div>
    ),
  },
  {
    id: "content",
    accessorKey: "content",
    header: "Content",
    cell: ({ row }) => (
       <div className="max-w-[250px]">
          <span className="text-sm line-clamp-2" title={row.original.content}>
             {row.original.spoiler && <Badge variant="destructive" className="text-[8px] mr-1.5 px-1 py-0 h-4">Spoiler</Badge>}
             {row.original.content}
          </span>
       </div>
    )
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      let variant: "default" | "secondary" | "destructive" | "outline" = "outline";
      
      if (status === "APPROVED") variant = "default";
      if (status === "PENDING") variant = "secondary";
      if (status === "REJECTED") variant = "destructive";

      return <Badge variant={variant} className="text-[10px] uppercase">{status}</Badge>;
    }
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date",
    cell: ({ row }) => {
      if (!row.original.createdAt) {
        return <span className="text-sm text-muted-foreground">N/A</span>;
      }
      return <DateCell date={row.original.createdAt} formatString="MMM dd, yyyy" />;
    },
  },
];
