"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle2, ShoppingBag, ArrowRight, Download } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const PaymentSuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="relative flex min-h-[90vh] items-center justify-center overflow-hidden px-4">
      {/* Background Decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
        <div className="h-[500px] w-[500px] rounded-full bg-green-500/10 blur-[120px] animate-pulse" />
      </div>
      <div className="absolute top-1/4 right-1/4 -z-10">
        <div className="h-[300px] w-[300px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-2xl"
      >
        <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/5 backdrop-blur-2xl p-8 md:p-12 shadow-2xl transition-all hover:shadow-green-500/10 dark:bg-black/20">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.2,
              }}
              className="relative mb-8"
            >
              <div className="absolute inset-0 animate-ping rounded-full bg-green-500/20" />
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-green-500/10 text-green-500 ring-4 ring-green-500/20">
                <CheckCircle2 className="h-12 w-12" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-4xl font-black tracking-tight md:text-5xl"
            >
              Payment Received!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-4 max-w-md text-lg text-muted-foreground"
            >
              Your transaction was successful. Get ready to dive into the world
              of premium cinema.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-10 w-full space-y-4"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Button
                  asChild
                  size="lg"
                  className="h-14 rounded-2xl text-base font-semibold transition-all hover:scale-[1.02] active:scale-95"
                >
                  <Link href="/dashboard/purchase-history">
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    View Order History
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 rounded-2xl border-white/10 bg-white/5 text-base font-semibold backdrop-blur-sm transition-all hover:bg-white/10 hover:scale-[1.02] active:scale-95"
                >
                  <Link href="/dashboard">
                    Back to Dashboard
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>

              {sessionId && (
                <div className="mt-8 flex flex-col items-center gap-2 rounded-2xl bg-white/5 p-4 border border-white/5 backdrop-blur-sm">
                  <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground/60">
                    Transaction Reference
                  </span>
                  <code className="text-sm font-mono text-primary/80 break-all px-4">
                    {sessionId}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs h-8 hover:bg-white/10"
                  >
                    <Download className="mr-2 h-3.5 w-3.5" />
                    Download Receipt
                  </Button>
                </div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Tip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-muted-foreground/60">
            A confirmation email has been sent to your registered address.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PaymentSuccessPage;
