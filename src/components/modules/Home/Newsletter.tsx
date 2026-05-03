"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="py-16 bg-white dark:bg-black text-black dark:text-white overflow-hidden relative border-y border-border">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-5 dark:opacity-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[80%] bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[80%] bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex p-3 bg-primary/10 rounded-2xl mb-6 backdrop-blur-sm">
            <Mail className="size-8 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Stay Updated with New Releases
          </h2>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Subscribe to our newsletter and never miss out on the latest
            blockbusters, exclusive interviews, and behind-the-scenes content.
          </p>
          <form
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-muted/50 border-border h-12 text-lg focus-visible:ring-primary"
              required
            />
            <Button size="lg" className="h-12 px-8 font-bold">
              Subscribe Now
            </Button>
          </form>
          <p className="mt-4 text-sm text-muted-foreground">
            Join 100,000+ subscribers. No spam, ever.
          </p>
        </div>
      </div>
    </section>
  );
}
