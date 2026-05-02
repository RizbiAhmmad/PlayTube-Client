"use client";

import { Button } from "@/components/ui/button";
import { PlayCircle, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

const CTA = () => {
  return (
    <section className="py-16 relative overflow-hidden bg-background">
      {/* Dynamic Background elements for light/dark themes */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 size-[400px] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 size-[400px] bg-primary/20 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative bg-card/40 backdrop-blur-3xl rounded-[3rem] p-10 md:p-20 overflow-hidden border shadow-2xl"
        >
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-8 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm"
              >
                <Zap className="size-4 animate-pulse" />
                <span>Start Streaming Today</span>
              </motion.div>

              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Ready to Experience <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
                  Cinematic Brilliance?
                </span>
              </h2>

              <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-xl mx-auto md:mx-0 leading-relaxed">
                Join our community of movie lovers. Get access to thousands of
                movies, series, and exclusive content instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center md:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="h-14 px-8 rounded-full font-bold text-lg shadow-lg hover:shadow-primary/25 transition-all hover:-translate-y-1"
                >
                  <Link href="/register">
                    Create Free Account
                    <ArrowRight className="ml-2 size-5" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 rounded-full font-bold text-lg bg-background/50 backdrop-blur-sm border-2 transition-all hover:bg-accent hover:-translate-y-1"
                >
                  <Link href="/media">
                    <PlayCircle className="mr-2 size-5" />
                    Explore Library
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right side artistic element */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex flex-1 justify-center relative"
            >
              <div className="relative w-80 h-96">
                <div className="absolute inset-0 bg-primary/30 rounded-[3rem] rotate-6 transform transition-transform hover:rotate-12 duration-500" />
                <div className="absolute inset-0 rounded-[3rem] -rotate-3 border shadow-xl overflow-hidden transform transition-transform hover:-rotate-6 duration-500 flex items-center justify-center p-8 text-center flex-col gap-4 group">
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors duration-500" />
                  <PlayCircle className="size-20 text-primary opacity-90 relative z-10" />
                  <p className="text-2xl font-bold text-white relative z-10 drop-shadow-lg">
                    Unlimited
                    <br />
                    Entertainment
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
