"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight, Star } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="container relative z-10 mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative bg-zinc-900 rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/5"
        >
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 size-[500px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 size-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mb-8 p-4 bg-primary/10 rounded-3xl border border-primary/20 backdrop-blur-md"
            >
              <PlayCircle className="size-16 text-primary animate-pulse" />
            </motion.div>

            <div className="space-y-6 max-w-4xl">
              <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">
                UNLEASH THE{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400 italic">
                  MAGIC
                </span>{" "}
                OF CINEMA.
              </h2>
              <p className="text-zinc-400 text-lg md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
                Join our premium community today and experience storytelling
                like never before. Exclusive content, anywhere, anytime.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-12 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="h-16 px-12 rounded-2xl font-black text-xl shadow-2xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <Link href="/register">
                  Join PlayTube Now
                  <ArrowRight className="ml-2 size-6" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-16 px-12 rounded-2xl font-bold text-xl backdrop-blur-xl border-white/20 text-white hover:bg-white/10 transition-all hover:scale-105 active:scale-95 bg-transparent"
              >
                <Link href="/media">Browse Gallery</Link>
              </Button>
            </div>

            <div className="mt-12 flex items-center gap-6 text-zinc-500 font-bold uppercase tracking-widest text-xs">
              <div className="flex items-center gap-2">
                <Star className="size-4 text-amber-500 fill-amber-500" />
                9.5/10 Rating
              </div>
              <div className="hidden sm:block w-px h-4 bg-zinc-800" />
              <div className="flex items-center gap-2">
                <Star className="size-4 text-primary fill-primary" />
                1M+ Community
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
