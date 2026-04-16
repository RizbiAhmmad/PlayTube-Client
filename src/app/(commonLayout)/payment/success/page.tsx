"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"

const PaymentSuccessPage = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get("session_id")

    return (
        <div className="flex min-h-[80vh] flex-col items-center justify-center px-4 text-center">
            <CheckCircle2 className="mb-6 size-20 text-green-500 animate-in zoom-in duration-500" />
            <h1 className="mb-2 text-4xl font-bold tracking-tight">Payment Successful!</h1>
            <p className="mb-8 max-w-md text-muted-foreground">
                Thank you for your purchase. Your payment has been processed successfully. 
                You can now enjoy your premium content.
            </p>
            {sessionId && (
                <div className="mb-8 rounded-lg bg-muted p-3 text-xs font-mono text-muted-foreground">
                    Session ID: {sessionId}
                </div>
            )}
            <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link href="/media">Browse More</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/dashboard">Go to Dashboard</Link>
                </Button>
            </div>
        </div>
    )
}

export default PaymentSuccessPage
