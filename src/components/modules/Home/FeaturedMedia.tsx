"use client";

import { IMedia } from "@/types/media.types";
import MediaCard from "@/components/shared/MediaCard";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface FeaturedMediaProps {
  title: string;
  description?: string;
  mediaList: IMedia[];
  viewAllLink?: string;
}

const FeaturedMedia = ({ title, description, mediaList, viewAllLink = "/media" }: FeaturedMediaProps) => {
  if (!mediaList || mediaList.length === 0) return null;

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div className="space-y-1">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              {title}
            </h2>
            {description && (
              <p className="text-muted-foreground text-lg max-w-2xl">
                {description}
              </p>
            )}
          </div>
          <Button asChild variant="ghost" className="hidden md:flex gap-1 group font-bold">
            <Link href={viewAllLink}>
              View All 
              <ChevronRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {mediaList.map((media) => (
            <MediaCard key={media.id} media={media} />
          ))}
        </div>

        {/* Mobile View All */}
        <div className="mt-8 md:hidden">
          <Button asChild variant="outline" className="w-full">
            <Link href={viewAllLink}>Explore More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMedia;
