/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useEffect, useState } from "react"
import { getMyReviews, deleteMyReview, IReview } from "@/services/review.services"
import { motion, AnimatePresence } from "framer-motion"
import { 
    Star, 
    Trash2, 
    Clock, 
    CheckCircle2, 
    XCircle,
    MessageSquare,
    ExternalLink
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { toast } from "sonner"
import { format } from "date-fns"

const MyReviewsPage = () => {
    const [reviews, setReviews] = useState<IReview[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const fetchReviews = async () => {
        try {
            const res = await getMyReviews()
            setReviews(res.data || [])
        } catch (error) {
            console.error("Error fetching reviews:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchReviews()
    }, [])

    const handleDelete = async (id: string) => {
        try {
            const res = await deleteMyReview(id)
            if (res.success) {
                toast.success("Review deleted successfully")
                setReviews(prev => prev.filter(r => r.id !== id))
            }
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Cannot delete this review.")
        }
    }

    if (isLoading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        )
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    }

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-20"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">My Reviews</h1>
                <p className="text-muted-foreground">Manage your ratings and reviews for movies and series.</p>
            </div>

            {reviews.length === 0 ? (
                <div className="py-20 text-center border border-dashed rounded-3xl bg-muted/20">
                    <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground/30" />
                    <h3 className="mt-4 text-lg font-semibold">No reviews yet</h3>
                    <p className="text-muted-foreground">Go browse some movies and share your thoughts!</p>
                    <Button className="mt-6 rounded-xl" asChild>
                        <Link href="/media">Browse Movies</Link>
                    </Button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    <AnimatePresence>
                        {reviews.map((review) => (
                            <motion.div 
                                key={review.id}
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="group relative rounded-3xl border bg-card/50 overflow-hidden hover:shadow-xl hover:border-primary/20 transition-all"
                            >
                                <div className="flex flex-col md:flex-row">
                                    {/* Media Thumbnail */}
                                    <div className="relative aspect-video w-full md:w-56 shrink-0 bg-muted">
                                        {review.media?.thumbnail ? (
                                            <Image 
                                              src={review.media.thumbnail} 
                                              alt={review.media.title} 
                                              fill 
                                              className="object-cover"
                                              sizes="(max-width: 768px) 100vw, 200px"
                                            />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center">N/A</div>
                                        )}
                                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Link href={`/media/${review.mediaId}`} className="text-white bg-primary p-2 rounded-full shadow-lg">
                                                <ExternalLink size={20} />
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Info Section */}
                                    <div className="flex-1 p-6 flex flex-col gap-4">
                                        <div className="flex flex-wrap items-start justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-foreground mb-1">{review.media?.title}</h3>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                                                        <Star className="size-4 fill-current" />
                                                        <span>{review.rating}/10</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">•</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {format(new Date(review.createdAt), "MMM dd, yyyy")}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3">
                                                <StatusBadge status={review.status} />
                                                {review.status === "PENDING" && (
                                                    <Button 
                                                      variant="destructive" 
                                                      size="icon" 
                                                      className="h-8 w-8 rounded-full"
                                                      onClick={() => handleDelete(review.id)}
                                                    >
                                                        <Trash2 size={14} />
                                                    </Button>
                                                )}
                                            </div>
                                        </div>

                                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                            {review.content}
                                        </p>

                                        {review.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1.5 pt-2">
                                                {review.tags.map(tag => (
                                                    <Badge key={tag} variant="secondary" className="bg-primary/5 text-[10px] text-primary/70 border-primary/10">
                                                        #{tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </motion.div>
    )
}

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case "APPROVED":
            return (
                <Badge className="bg-green-500/10 text-green-500 border-none gap-1.5 py-1">
                    <CheckCircle2 size={12} />
                    Approved
                </Badge>
            )
        case "REJECTED":
            return (
                <Badge variant="destructive" className="gap-1.5 py-1">
                    <XCircle size={12} />
                    Rejected
                </Badge>
            )
        default:
            return (
                <Badge className="bg-amber-500/10 text-amber-500 border-none gap-1.5 py-1">
                    <Clock size={12} />
                    Pending
                </Badge>
            )
    }
}

export default MyReviewsPage
