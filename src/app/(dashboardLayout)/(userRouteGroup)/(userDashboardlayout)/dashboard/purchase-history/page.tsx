"use client"

import { useEffect, useState } from "react"
import { getMyPayments } from "@/services/payment.services"
import { motion } from "framer-motion"
import { IPayment } from "@/types/dashboard.types"
import { 
    Table, 
    TableBody, 
    TableCell, 
    TableHead, 
    TableHeader, 
    TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ShoppingBag, Calendar, CreditCard, Download} from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const PurchaseHistoryPage = () => {
    const [payments, setPayments] = useState<IPayment[]>([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const res = await getMyPayments()
                setPayments(res.data)
            } catch (error) {
                console.error("Error fetching payments:", error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchPayments()
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
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
            className="space-y-8"
        >
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Purchase History</h1>
                <p className="text-muted-foreground">Manage your transactions and download invoices.</p>
            </div>

            {payments.length === 0 ? (
                <motion.div 
                    variants={itemVariants}
                    className="flex flex-col items-center justify-center rounded-3xl border border-dashed p-20 text-center"
                >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No purchases yet</h3>
                    <p className="mt-2 text-sm text-muted-foreground">Once you purchase or rent movies, they will appear here.</p>
                </motion.div>
            ) : (
                <motion.div 
                    variants={itemVariants}
                    className="rounded-3xl border bg-card shadow-sm overflow-hidden"
                >
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[300px]">Item</TableHead>
                                <TableHead>Transaction ID</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Invoice</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {payments.map((payment) => (
                                <TableRow key={payment.id} className="transition-colors hover:bg-muted/30">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="hidden relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-muted sm:flex">
                                                {payment.media?.thumbnail ? (
                                                    <Image 
                                                        src={payment.media.thumbnail} 
                                                        alt={payment.media.title} 
                                                        fill
                                                        className="object-cover"
                                                        sizes="48px"
                                                    />
                                                ) : (
                                                    <div className="flex h-full w-full items-center justify-center">
                                                        <ShoppingBag className="h-6 w-6 text-muted-foreground" />
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                <p className="font-medium">{payment.media?.title || payment.paymentType}</p>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wider">{payment.paymentType}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">
                                            {payment.transactionId?.slice(0, 10)}...
                                        </code>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4" />
                                            {format(new Date(payment.createdAt), "MMM d, yyyy")}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1 font-semibold">
                                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                                            ${payment.amount.toFixed(2)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={payment.status === "PAID" ? "default" : "secondary"} className={payment.status === "PAID" ? "bg-green-500/10 text-green-500 hover:bg-green-500/20" : ""}>
                                            {payment.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {payment.invoiceUrl ? (
                                            <Button variant="ghost" size="sm" asChild>
                                                <a href={payment.invoiceUrl} target="_blank" rel="noopener noreferrer">
                                                    <Download className="mr-2 h-4 w-4" />
                                                    PDF
                                                </a>
                                            </Button>
                                        ) : (
                                            <span className="text-xs text-muted-foreground italic">Processing...</span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </motion.div>
            )}
        </motion.div>
    )
}

export default PurchaseHistoryPage
