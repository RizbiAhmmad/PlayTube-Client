"use client";

import Pricing from "@/components/modules/Home/Pricing";
import { motion } from "framer-motion";
import { CheckCircle2, HelpCircle } from "lucide-react";

const PricingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-8 text-center space-y-6">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter"
          >
            READY TO <span className="text-primary italic">SUBSCRIBE?</span>
          </motion.h1>
          <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
            Choose the plan that&apos;s right for you. Change or cancel your plan at any time.
          </p>
        </div>
      </section>

      {/* Main Pricing Component */}
      <Pricing />

      {/* FAQ / Comparison */}
      <section className="py-24 border-t border-border/50">
        <div className="container mx-auto px-8 max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-16">Frequently Asked Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="flex gap-3">
                <HelpCircle className="size-6 text-primary shrink-0 mt-1" />
                <h3 className="text-xl font-bold">Can I cancel my subscription?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-9">
                Yes, you can cancel your subscription at any time through your dashboard. 
                You will continue to have access until the end of your billing cycle.
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex gap-3">
                <HelpCircle className="size-6 text-primary shrink-0 mt-1" />
                <h3 className="text-xl font-bold">Which devices can I use?</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed pl-9">
                PlayTube is available on browsers, iOS, Android, Smart TVs, and gaming consoles 
                like Playstation and Xbox.
              </p>
            </div>
          </div>

          <div className="mt-20 p-8 rounded-[2.5rem] bg-muted/50 border border-border/50">
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="size-12 text-primary" />
                <div className="space-y-1">
                  <h4 className="text-2xl font-bold">Student Discount</h4>
                  <p className="text-muted-foreground">Are you a student? You might be eligible for 50% off.</p>
                </div>
              </div>
              <button className="px-8 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;
