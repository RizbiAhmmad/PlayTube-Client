"use client";

import { IMedia } from "@/types/media.types";
import { Play, Star, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const MediaCard = ({ media }: { media: IMedia }) => {
  return (
    <Link
      href={`/media/${media.id}`}
      className="group relative block overflow-hidden rounded-xl bg-card border transition-all hover:border-primary/50 hover:shadow-xl hover:shadow-primary/10"
    >
      {/* Poster Image */}
      <div className="relative aspect-square w-full overflow-hidden">
        <Image
          src={
            media.thumbnail ||
            "https://unsplash.com/photos/a-film-clapper-and-some-reels-on-a-table-mQySTK6ejR8"
          }
          alt={media.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Hover Play Button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex size-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="size-6 fill-current" />
          </div>
        </div>

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          <Badge className="bg-primary/90 hover:bg-primary border-none text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm">
            {media.type || "Action"}
          </Badge>
          {media.pricingType === "PREMIUM" && (
            <Badge
              variant="secondary"
              className="bg-amber-500/90 text-white border-none text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm"
            >
              Premium
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <h3 className="line-clamp-1 text-lg font-bold transition-colors group-hover:text-primary">
          {media.title}
        </h3>

        <div className="flex items-center justify-between text-sm text-muted-foreground font-medium">
          <div className="flex items-center gap-1.5">
            <Star className="size-4 text-amber-500 fill-amber-500" />
            <span className="text-foreground">
              {media.averageRating || "0.0"}
            </span>
            <span className="text-[10px] text-muted-foreground">
              ({media.reviewCount || 0})
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar className="size-4" />
            <span>{media.releaseYear}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-hidden">
          {media.type && (
            <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full border truncate max-w-full font-bold">
              {media.genres?.[0] || "Action"}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default MediaCard;
