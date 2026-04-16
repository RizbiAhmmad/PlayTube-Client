"use client"

import { Button } from "@/components/ui/button"
import { XCircle } from "lucide-react"
import Link from "next/link"

const PaymentCancelPage = () => {
    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            <XCircle className="mb-6 size-20 text-red-500 animate-in zoom-in duration-500" />
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Payment Cancelled</h1>
            <p className="mb-8 max-w-md text-muted-foreground">
                It looks like you cancelled your payment or something went wrong. 
                Don&apos;t worry, no charges were made.
            </p>
            <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link href="/media">Try Again</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    )
}

export default PaymentCancelPage
