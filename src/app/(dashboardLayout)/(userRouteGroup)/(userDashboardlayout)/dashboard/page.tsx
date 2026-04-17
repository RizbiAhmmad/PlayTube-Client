"use client"

import { useEffect, useState } from "react"
import { getDashboardData } from "@/services/dashboard.services"
import { getMyPayments } from "@/services/payment.services"
import { motion } from "framer-motion"
import { IPayment, IUserDashboardData } from "@/types/dashboard.types"
import { 
    CreditCard, 
    ShoppingBag, 
    Bookmark, 
    Star, 
    ArrowUpRight,
    TrendingUp,
    Video
} from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const UserDashboardPage = () => {
    const [stats, setStats] = useState<IUserDashboardData | null>(null)
    const [recentPayments, setRecentPayments] = useState<IPayment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, paymentsRes] = await Promise.all([
                    getDashboardData(),
                    getMyPayments()
                ])
                setStats(statsRes.data as unknown as IUserDashboardData)
                setRecentPayments(paymentsRes.data?.slice(0, 5) || [])
            } catch (error) {
                console.error("Error fetching dashboard data:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [])

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

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }

    const statCards = [
        {
            title: "Total Spent",
            value: `$${stats?.totalSpent?.toFixed(2) || "0.00"}`,
            icon: CreditCard,
            color: "text-blue-500",
            bg: "bg-blue-500/10",
            trend: "+12.5%"
        },
        {
            title: "Movie Purchases",
            value: stats?.purchaseCount || 0,
            icon: ShoppingBag,
            color: "text-green-500",
            bg: "bg-green-500/10",
            trend: "+2"
        },
        {
            title: "Watchlist Items",
            value: stats?.watchlistCount || 0,
            icon: Bookmark,
            color: "text-purple-500",
            bg: "bg-purple-500/10",
            trend: "Updated"
        },
        {
            title: "Reviews Written",
            value: stats?.reviewCount || 0,
            icon: Star,
            color: "text-yellow-500",
            bg: "bg-yellow-500/10",
            trend: "Top 10%"
        }
    ]

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="space-y-8 pb-10"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
                <p className="text-muted-foreground">Welcome back! Here&apos;s what&apos;s happening with your account.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {statCards.map((stat, index) => (
                    <motion.div 
                        key={index}
                        variants={cardVariants}
                        className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                    >
                        <div className={`inline-flex rounded-2xl ${stat.bg} ${stat.color} p-3 group-hover:scale-110 transition-transform`}>
                            <stat.icon size={24} />
                        </div>
                        <div className="mt-4 flex items-baseline justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                            </div>
                            <Badge variant="secondary" className="bg-muted text-[10px] items-center gap-1 font-bold">
                                {stat.trend}
                                <TrendingUp size={10} />
                            </Badge>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                {/* Recent Purchases */}
                {(() => {
                    const lastPurchase = recentPayments.find(p => p.mediaId);
                    const resumeLink = lastPurchase?.media?.streamingUrl || (lastPurchase ? `/media/${lastPurchase.mediaId}` : "/media");
                    const isExternal = resumeLink.startsWith('http');
                    
                    return (
                        <>
                <motion.div 
                    variants={cardVariants}
                    className="lg:col-span-2 rounded-3xl border bg-card shadow-sm"
                >
                    <div className="flex items-center justify-between border-b p-6">
                        <h2 className="text-xl font-bold">Recent Purchases</h2>
                        <Button variant="ghost" size="sm" asChild>
                            <Link href="/dashboard/purchase-history" className="flex items-center gap-2">
                                View History
                                <ArrowUpRight size={16} />
                            </Link>
                        </Button>
                    </div>
                    <div className="p-0">
                        {recentPayments.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground">
                                No recent purchases found.
                            </div>
                        ) : (
                            <div className="divide-y">
                                {recentPayments.map((payment) => (
                                    <div key={payment.id} className="flex items-center justify-between p-4 px-6 hover:bg-muted/30 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="h-10 w-10 relative overflow-hidden rounded-lg bg-muted">
                                                {payment.media?.thumbnail ? (
                                                    <Image src={payment.media.thumbnail} alt="" fill className="object-cover" sizes="40px" />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center"><Video size={20} /></div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-sm">{payment.media?.title || "Subscription"}</p>
                                                <p className="text-xs text-muted-foreground">{new Date(payment.createdAt).toLocaleDateString()}</p>
                                            </div>
                                        </div>
                                        <div className="text-right flex flex-col items-end gap-1">
                                            <p className="font-bold text-sm text-primary">+${payment.amount.toFixed(2)}</p>
                                            <Badge className="text-[10px] px-1.5 h-4 bg-green-500/10 text-green-500 border-none">COMPLETED</Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>

                {/* Quick actions or info */}
                <motion.div 
                    variants={cardVariants}
                    className="space-y-6"
                >

<div className="relative overflow-hidden rounded-3xl border bg-card p-0 shadow-lg group">
                        {lastPurchase && lastPurchase.media ? (
                            <div className="flex flex-col">
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    <Image 
                                        src={lastPurchase.media.thumbnail || ""} 
                                        alt={lastPurchase.media.title} 
                                        fill 
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                        sizes="300px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4">
                                        <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 border-none animate-pulse">
                                            RESUME
                                        </Badge>
                                        <h4 className="font-bold text-lg text-white line-clamp-1 mb-1">{lastPurchase.media.title}</h4>
                                        <p className="text-[10px] text-gray-300">Ready to stream now</p>
                                    </div>
                                </div>
                                <div className="p-4 pt-4">
                                    <Button variant="default" className="w-full rounded-2xl font-bold bg-primary hover:opacity-90 transition-all shadow-md group-hover:shadow-primary/20" asChild>
                                        <Link 
                                            href={resumeLink} 
                                            target={isExternal ? "_blank" : undefined}
                                            rel={isExternal ? "noopener noreferrer" : undefined}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <Video size={18} />
                                            Watch Now
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <div className="p-8 flex flex-col items-center text-center gap-4">
                                <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Video className="text-primary" size={28} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-lg">Empty Queue</h4>
                                    <p className="text-xs text-muted-foreground mt-1">Start your journey by picking a movie from our library.</p>
                                </div>
                                <Button variant="outline" size="sm" className="rounded-xl w-full" asChild>
                                    <Link href="/media">Explore Now</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="rounded-3xl bg-primary p-8 text-primary-foreground shadow-lg relative overflow-hidden group">
                        <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 rounded-full bg-white/10 blur-xl group-hover:scale-150 transition-transform duration-500" />
                        <h3 className="text-2xl font-black mb-2 tracking-tight">Go Premium</h3>
                        <p className="text-primary-foreground/80 text-sm mb-6">Unlock unlimited access to all 4K contents and exclusive series.</p>
                        <Button variant="secondary" className="w-full rounded-2xl font-bold hover:scale-[1.02] active:scale-95 transition-all">
                            Upgrade Now
                        </Button>
                    </div>

                    
                </motion.div>
                </>
                    )
                })()}
            </div>
        </motion.div>
    )
}

export default UserDashboardPage