/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Button } from "@/components/ui/button"
import { createCheckoutSession } from "@/services/payment.services"
import { CreditCard, Loader2 } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface BuyNowButtonProps {
  mediaId: string
  amount: number
  userId?: string
}

const BuyNowButton = ({ mediaId, amount, userId}: BuyNowButtonProps) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handlePurchase = async () => {
    if (!userId) {
      toast.error("Please login to purchase this media")
      router.push("/login")
      return
    }

    try {
      setLoading(true)
      const res = await createCheckoutSession({
        userId,
        mediaId,
        amount,
        paymentType: "PURCHASE"
      })

      if (res.success && res.data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = res.data.url
      } else {
        throw new Error(res.message || "Failed to initiate payment")
      }
    } catch (error: any) {
      console.error("Purchase error:", error)
      toast.error(error.message || "Something went wrong with the payment")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button 
      size="lg" 
      onClick={handlePurchase}
      disabled={loading}
      className="h-14 gap-3 bg-primary px-8 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
    >
      {loading ? (
        <Loader2 className="size-6 animate-spin" />
      ) : (
        <CreditCard className="size-6" />
      )}
      {loading ? "Processing..." : `Buy Now for $${amount}`}
    </Button>
  )
}

export default BuyNowButton
