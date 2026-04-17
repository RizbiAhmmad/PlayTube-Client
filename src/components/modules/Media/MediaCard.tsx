"use client"

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { IMedia } from "@/types/media.types"
import { Bookmark, BookmarkCheck, Star } from "lucide-react"
import { useEffect, useState } from "react"
import { addToWatchlist, removeFromWatchlist } from "@/services/watchlist.services"
import { toast } from "sonner"
import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface MediaCardProps {
  media: IMedia
  initialIsWatchlisted?: boolean
}

const MediaCard = ({ media, initialIsWatchlisted = false }: MediaCardProps) => {
  const [isWatchlisted, setIsWatchlisted] = useState(initialIsWatchlisted)
  const [isActing, setIsActing] = useState(false)
  const queryClient = useQueryClient()

  useEffect(() => {
    setIsWatchlisted(initialIsWatchlisted)
  }, [initialIsWatchlisted])

  const handleWatchlistToggle = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    if (isActing) return
    setIsActing(true)

    try {
      if (isWatchlisted) {
        await removeFromWatchlist(media.id)
        setIsWatchlisted(false)
        toast.success(`Removed "${media.title}" from watchlist`)
      } else {
        await addToWatchlist(media.id)
        setIsWatchlisted(true)
        toast.success(`"${media.title}" added to watchlist`)
      }
      // Refresh the global watchlist query so other components stay updated
      queryClient.invalidateQueries({ queryKey: ["my-watchlist"] })
    } catch (error) {
      toast.error("Failed to update watchlist")
      console.error("Error updating watchlist:", error)
    } finally {
      setIsActing(false)
    }
  }
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative h-full"
    >
      <Card className="flex h-full flex-col overflow-hidden border-muted-foreground/10 bg-gradient-to-br from-background/80 to-background/40 shadow-lg backdrop-blur-md transition-all group-hover:border-primary/30 group-hover:shadow-primary/5">
        <Link href={`/media/${media.id}`} className="relative aspect-square w-full overflow-hidden">
          {/* Thumbnail with better scaling */}
          <Image
            src={media.thumbnail}
            alt={media.title}
            fill
            priority
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
          
          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 transition-all duration-500 group-hover:bg-black/60 group-hover:opacity-100 flex items-center justify-center backdrop-blur-[2px]">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-2 rounded-full bg-primary px-6 py-2.5 font-semibold text-primary-foreground shadow-[0_0_20px_rgba(var(--primary),0.5)]"
            >
              {/* <Play className="size-4 fill-current" /> */}
              <span>View Details</span>
            </motion.div>
          </div>

          {/* Premium Badges */}
          <div className="absolute left-3 top-3 flex flex-col gap-2 opacity-90 group-hover:opacity-100 transition-opacity">
            <Badge className="bg-black/60 font-medium text-white backdrop-blur-xl border-white/10 ring-1 ring-white/20">
              {media.type}
            </Badge>
            {media.pricingType === "PREMIUM" && (
              <Badge className="bg-amber-600/80 font-bold text-white backdrop-blur-xl border-amber-400/20 ring-1 ring-amber-400/30">
                PREMIUM
              </Badge>
            )}
          </div>

          {/* Floating Release Year */}
          <div className="absolute bottom-3 right-3 rounded-md bg-black/60 px-2 py-1 text-[10px] font-bold text-white backdrop-blur-xl border border-white/10">
            {media.releaseYear}
          </div>
        </Link>

        {/* Watchlist Toggle Button */}
        <button
          onClick={handleWatchlistToggle}
          disabled={isActing}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110 active:scale-95 ${
            isWatchlisted 
            ? "bg-primary text-primary-foreground" 
            : "bg-black/40 text-white hover:bg-black/60"
          }`}
        >
          {isWatchlisted ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </button>

        {/* Content Section */}
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex flex-wrap gap-1.5">
            {media.genres.slice(0, 3).map((genre) => (
              <span key={genre} className="text-[10px] font-bold uppercase tracking-widest text-primary/80">
                {genre}
              </span>
            ))}
          </div>

          <Link href={`/media/${media.id}`} className="mb-3 block">
            <h3 className="line-clamp-2 text-lg font-bold leading-tight tracking-tight transition-colors group-hover:text-primary">
              {media.title}
            </h3>
          </Link>
          
          <div className="mt-auto flex items-center justify-between border-t border-muted/30 pt-4">
             <div className="flex items-center gap-1.5 text-amber-500">
                <Star className="size-3.5 fill-current" />
                <span className="text-xs font-bold leading-none">8.4</span>
             </div>
             
             <div className="text-sm font-black tracking-tight text-foreground/90">
                {media.pricingType === "FREE" ? (
                  <span className="text-green-500">FREE</span>
                ) : (
                  <span className="text-primary">${media.price}</span>
                )}
             </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default MediaCard
