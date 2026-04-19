"use client";

import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const Pricing = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for testing our basic features.",
      features: ["Standard Quality", "Ads Supported", "Limited Library", "1 Device"],
      buttonText: "Get Started",
      highlight: false,
    },
    {
      name: "Monthly",
      price: "$12.99",
      description: "Our most popular plan for ongoing updates.",
      features: ["Full HD Content", "No Ads", "Unlimited Library", "3 Devices", "Offline Viewing"],
      buttonText: "Subscribe Now",
      highlight: true,
      tag: "Most Popular",
    },
    {
      name: "Yearly",
      price: "$119.99",
      description: "Best value for dedicated movie lovers.",
      features: ["4K HDR Quality", "No Ads", "Exclusive Content", "Unlimited Library", "5 Devices", "Priority Support"],
      buttonText: "Get Best Value",
      highlight: false,
      tag: "Best Deal",
    },
  ];

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold tracking-tight md:text-5xl">Choose Your Plan</h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience PlayTube your way. From high-octane action to award winning dramas, 
            unlock a world of entertainment today.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={cn(
                "relative flex flex-col transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 border-2",
                plan.highlight ? "border-primary shadow-xl scale-105 z-10 bg-card" : "border-border bg-card/50"
              )}
            >
              {plan.tag && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                   <Badge className="px-4 py-1 text-xs font-bold uppercase tracking-wider shadow-lg">
                      {plan.tag}
                   </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pt-8">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-extrabold tracking-tight">{plan.price}</span>
                  {plan.price !== "Free" && <span className="text-muted-foreground text-sm font-medium">/{plan.name === "Yearly" ? "year" : "mo"}</span>}
                </div>
                <p className="text-muted-foreground mt-4 text-sm font-medium">{plan.description}</p>
              </CardHeader>

              <CardContent className="flex-1 space-y-6 pt-6">
                <div className="space-y-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className={cn(
                        "flex size-5 items-center justify-center rounded-full shrink-0",
                        plan.highlight ? "bg-primary text-white" : "bg-muted text-muted-foreground"
                      )}>
                        <Check className="size-3.5 stroke-[3px]" />
                      </div>
                      <span className="text-sm font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pb-8">
                <Button 
                  className={cn(
                    "w-full h-12 font-bold text-lg rounded-xl transition-all active:scale-95",
                    plan.highlight ? "bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20" : "bg-secondary hover:bg-secondary/80 text-secondary-foreground"
                  )}
                >
                  <Zap className={cn("mr-2 size-4 fill-current", plan.highlight ? "text-amber-400" : "text-muted-foreground")} />
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
