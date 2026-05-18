"use client";

import { motion } from "framer-motion";
import {
  CircleDollarSign,
  RefreshCcw,
  HelpCircle,
  Calendar,
} from "lucide-react";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-primary/5">
        <div className="container relative z-10 mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase mb-6">
              <CircleDollarSign className="size-4" />
              Legal Center
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Refund Policy
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl leading-relaxed">
              We want you to be satisfied with PlayTube. This policy outlines
              when and how we handle refunds for our subscription plans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <RefreshCcw className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">Subscription Refunds</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Generally, all charges for subscriptions are non-refundable, and
                there are no refunds or credits for partially used periods.
                However, we may make an exception if a refund is requested
                within 48 hours of the transaction date.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <Calendar className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">Billing Cycles</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Refunds are not available for users who have used the service
                for more than 2 hours or have downloaded content during the
                billing period. If you cancel your subscription, you will
                continue to have access to the service until the end of your
                current billing period.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="prose prose-slate dark:prose-invert max-w-none"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-2xl bg-primary/10 text-primary">
                  <HelpCircle className="size-6" />
                </div>
                <h2 className="text-2xl font-bold m-0">
                  How to Request a Refund
                </h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To request a refund, please contact our support team at
                billing@playtube.com with your account email and transaction ID.
                Our team will review your request and get back to you within 3-5
                business days.
              </p>
            </motion.div>

            <div className="pt-10 border-t">
              <p className="text-sm text-muted-foreground">
                Last updated: May 02, 2026. If you have any further questions,
                please reach out to our billing department.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefundPolicy;
