"use client";

import { Check, Sparkles, Zap, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      icon: <Shield className="size-6 text-blue-400" />,
      price: "0",
      description: "Perfect for testing our basic features.",
      features: [
        "Standard Quality (720p)",
        "Commercial Interruptions",
        "Large Selection of Movies",
        "1 Active Screen",
      ],
      buttonText: "Start for Free",
      highlight: false,
      color: "blue",
    },
    {
      name: "Standard",
      icon: <Sparkles className="size-6 text-primary" />,
      price: "12.99",
      description: "Our most popular plan for daily entertainment.",
      features: [
        "Full HD Quality (1080p)",
        "Zero Advertisements",
        "Full Access Library",
        "3 Simultaneous Screens",
        "Offline Downloads",
      ],
      buttonText: "Get Standard",
      highlight: true,
      tag: "Most Popular",
      color: "primary",
    },
    {
      name: "Ultimate",
      icon: <Crown className="size-6 text-amber-400" />,
      price: "19.99",
      description: "The ultimate cinematic experience at home.",
      features: [
        "Ultra HD 4K + HDR",
        "Premium Audio Experience",
        "Exclusive Early Access",
        "Unlimited Content Access",
        "6 Simultaneous Screens",
        "24/7 Priority Support",
      ],
      buttonText: "Go Ultimate",
      highlight: false,
      tag: "Best Value",
      color: "amber",
    },
  ];

  return (
    <section
      className="py-16 relative overflow-hidden bg-background"
      id="pricing"
    >
      {/* Background Orbs */}
      <div className="absolute top-1/4 -right-24 size-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -left-24 size-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-8 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              Simple, Transparent{" "}
              <span className="text-primary italic">Pricing.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              No hidden fees, no long-term contracts. Choose the plan that fits
              your lifestyle and start your cinematic journey today.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div
                className={cn(
                  "group relative h-full flex flex-col p-8 rounded-[2.5rem] border transition-all duration-500",
                  plan.highlight
                    ? "bg-primary/[0.03] border-primary shadow-2xl shadow-primary/10 scale-105 lg:scale-110 z-10"
                    : "bg-card border-border hover:border-primary/50",
                )}
              >
                {plan.tag && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span
                      className={cn(
                        "px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xl",
                        plan.highlight
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border",
                      )}
                    >
                      {plan.tag}
                    </span>
                  </div>
                )}

                <div className="mb-8 flex items-center justify-between">
                  <div
                    className={cn(
                      "p-3 rounded-2xl",
                      plan.highlight ? "bg-primary/10" : "bg-muted",
                    )}
                  >
                    {plan.icon}
                  </div>
                  <h3 className="text-2xl font-bold">{plan.name}</h3>
                </div>

                <div className="mb-8">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-bold text-muted-foreground opacity-70">
                      $
                    </span>
                    <span className="text-5xl font-black tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground text-sm font-medium">
                      /mo
                    </span>
                  </div>
                  <p className="text-muted-foreground mt-4 text-sm leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 group/item"
                    >
                      <div
                        className={cn(
                          "mt-1 flex size-5 items-center justify-center rounded-full shrink-0 transition-colors",
                          plan.highlight
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground group-hover/item:bg-primary/10 group-hover/item:text-primary",
                        )}
                      >
                        <Check className="size-3.5 stroke-[3.5px]" />
                      </div>
                      <span className="text-sm font-bold text-foreground/80 group-hover/item:text-foreground transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <Button
                  className={cn(
                    "w-full h-14 font-extrabold text-lg rounded-2xl transition-all duration-300 active:scale-[0.98]",
                    plan.highlight
                      ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                      : "bg-secondary hover:bg-secondary/80 text-secondary-foreground border border-border",
                  )}
                >
                  <Zap
                    className={cn(
                      "mr-2 size-5 fill-current",
                      plan.highlight ? "text-amber-400" : "text-primary",
                    )}
                  />
                  {plan.buttonText}
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="text-muted-foreground text-sm font-medium flex items-center justify-center gap-2">
            <Shield className="size-4 text-primary" />
            All plans include a 7-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
