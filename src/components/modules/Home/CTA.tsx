"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 bg-primary opacity-[0.03] pattern-grid" />
      
      <div className="container relative z-10 mx-auto px-8">
        <div className="bg-primary rounded-3xl p-8 md:p-16 flex flex-col items-center text-center space-y-8 shadow-2xl shadow-primary/20 overflow-hidden relative">
          {/* Decorative shapes */}
          <div className="absolute -top-24 -right-24 size-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 size-64 bg-black/10 rounded-full blur-3xl" />
          
          <PlayCircle className="size-20 text-primary-foreground opacity-50" />
          
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              Ready to Dive into the World of Cinema?
            </h2>
            <p className="text-primary-foreground/80 text-lg md:text-xl font-medium">
              Join thousands of satisfied subscribers and start streaming your favorite 
              movies and series today. Catch exclusive premieres and timeless classics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 h-16 px-10 rounded-2xl font-bold text-lg shadow-xl active:scale-95 transition-all">
              <Link href="/register">Create Your Account</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 text-white hover:bg-white/10 h-16 px-10 rounded-2xl font-bold text-lg backdrop-blur-sm active:scale-95 transition-all">
              <Link href="/pricing">Explore Plans</Link>
            </Button>
          </div>
          
          <p className="text-primary-foreground/60 text-sm font-semibold tracking-wide uppercase">
            No credit card required for standard trials
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
