/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { getMyWatchlist, removeFromWatchlist } from "@/services/watchlist.services"
import { getMyPayments } from "@/services/payment.services"
import { motion, AnimatePresence } from "framer-motion"
import { IPayment } from "@/types/dashboard.types"
import { IMedia } from "@/types/media.types"
import { 
    Bookmark, 
    Play, 
    Trash2,  
    Star, 
    ShoppingBag, 
    Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"

interface IWatchlistItem {
    id: string;
    userId: string;
    mediaId: string;
    media: IMedia;
    createdAt: string;
}

interface MediaCardProps {
    media: IMedia;
    onRemove?: () => void;
    isWatchlist?: boolean;
    isPurchase?: boolean;
    streamingUrl?: string | null;
}

const WatchlistPage = () => {
    const [watchlist, setWatchlist] = useState<IWatchlistItem[]>([])
    const [purchases, setPurchases] = useState<IPayment[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<"watchlist" | "purchases">("watchlist")
    const [searchQuery, setSearchQuery] = useState("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [watchlistRes, paymentsRes] = await Promise.all([
                    getMyWatchlist(),
                    getMyPayments()
                ])
                setWatchlist(watchlistRes.data || [])
                setPurchases(paymentsRes.data || [])
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

    const handleRemove = async (mediaId: string) => {
        try {
            await removeFromWatchlist(mediaId)
            setWatchlist(prev => prev.filter(item => item.mediaId !== mediaId))
            toast.success("Removed from watchlist")
        } catch (error) {
            toast.error("Failed to remove item")
            console.error("Error removing from watchlist:", error)
        }
    }

    const filteredWatchlist = watchlist.filter(item => 
        item.media.title.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredPurchases = purchases.filter(item => 
        item.media?.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0 }
    }

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        )
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20"
        >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Your Library</h1>
                    <p className="text-muted-foreground">Manage your saved titles and purchased movies.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <Input 
                        placeholder="Search titles..." 
                        className="pl-10 rounded-xl bg-card" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 bg-muted/50 rounded-2xl w-fit">
                <button 
                    onClick={() => setActiveTab("watchlist")}
                    className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "watchlist" ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                    Watchlist ({watchlist.length})
                </button>
                <button 
                    onClick={() => setActiveTab("purchases")}
                    className={`px-6 py-2 rounded-xl text-sm font-semibold transition-all ${activeTab === "purchases" ? "bg-card shadow-sm text-primary" : "text-muted-foreground hover:text-primary"}`}
                >
                    Purchased ({purchases.length})
                </button>
            </div>

            <AnimatePresence mode="wait">
                {activeTab === "watchlist" ? (
                    <motion.div 
                        key="watchlist"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filteredWatchlist.length === 0 ? (
                            <div className="col-span-full py-20 text-center border border-dashed rounded-3xl">
                                <Bookmark className="mx-auto h-12 w-12 text-muted-foreground/30" />
                                <h3 className="mt-4 text-lg font-semibold">Watchlist is empty</h3>
                                <p className="text-muted-foreground">Titles you save will appear here.</p>
                            </div>
                        ) : (
                            filteredWatchlist.map((item) => (
                                <MediaCard 
                                    key={item.id} 
                                    media={item.media} 
                                    onRemove={() => handleRemove(item.mediaId)} 
                                    isWatchlist 
                                    variants={itemVariants}
                                />
                            ))
                        )}
                    </motion.div>
                ) : (
                    <motion.div 
                        key="purchases"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {filteredPurchases.length === 0 ? (
                            <div className="col-span-full py-20 text-center border border-dashed rounded-3xl">
                                <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground/30" />
                                <h3 className="mt-4 text-lg font-semibold">No purchases found</h3>
                                <p className="text-muted-foreground">Movies you buy or rent will show up here.</p>
                            </div>
                        ) : (
                            filteredPurchases.map((item) => (
                                <MediaCard 
                                    key={item.id} 
                                    media={item.media as IMedia} 
                                    isPurchase
                                    streamingUrl={item.media?.streamingUrl}
                                    variants={itemVariants}
                                />
                            ))
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

const MediaCard = ({ media, onRemove, isWatchlist, isPurchase, streamingUrl, variants }: MediaCardProps & { variants?: any }) => {
    return (
        <motion.div 
            layout
            variants={variants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, scale: 0.9 }}
            className="group relative flex flex-col overflow-hidden rounded-3xl border bg-card shadow-sm transition-all hover:shadow-xl"
        >
            <div className="aspect-[2/3] relative overflow-hidden bg-muted">
                {media.thumbnail && (
                    <Image 
                        src={media.thumbnail} 
                        alt={media.title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110" 
                        sizes="(max-width: 768px) 100vw, 25vw"
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                
                {/* Overlay Buttons */}
                <div className="absolute inset-0 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                    {isPurchase ? (
                        <Button size="icon" className="h-12 w-12 rounded-full bg-primary shadow-lg" asChild title="Stream Now">
                            <Link 
                                href={streamingUrl || `/media/${media.id}`} 
                                target={streamingUrl?.startsWith('http') ? "_blank" : "_self"}
                                rel={streamingUrl?.startsWith('http') ? "noopener noreferrer" : undefined}
                            >
                                <Play fill="currentColor" size={24} />
                            </Link>
                        </Button>
                    ) : (
                        <Button size="icon" className="h-12 w-12 rounded-full bg-primary shadow-lg" asChild title="Watch Trial">
                            <Link 
                                href={media.trailerUrl || `/media/${media.id}`} 
                                target={media.trailerUrl?.startsWith('http') ? "_blank" : "_self"}
                                rel={media.trailerUrl?.startsWith('http') ? "noopener noreferrer" : undefined}
                            >
                                <Play fill="currentColor" size={24} />
                            </Link>
                        </Button>
                    )}
                </div>
                
                {isWatchlist && (
                    <Button 
                        onClick={onRemove}
                        variant="destructive" 
                        size="icon" 
                        className="absolute top-3 right-3 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                        <Trash2 size={16} />
                    </Button>
                )}
            </div>

            <div className="p-4 flex flex-col gap-1">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold line-clamp-1 flex-1 group-hover:text-primary transition-colors">{media.title}</h3>
                    <Badge variant="secondary" className="text-[10px] uppercase">{media.type}</Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                        <Star className="text-yellow-500" size={12} fill="currentColor" />
                        <span>4.5</span>
                    </div>
                    <span>{media.releaseYear}</span>
                </div>
            </div>
        </motion.div>
    )
}

export default WatchlistPage
