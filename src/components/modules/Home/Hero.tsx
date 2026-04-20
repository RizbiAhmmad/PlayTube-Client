"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Play } from "lucide-react";
import { motion } from "framer-motion";

const Hero = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/media?searchTerm=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push("/media");
    }
  };

  return (
    <section className="relative min-h-[85vh] md:h-[85vh] w-full overflow-hidden flex items-center justify-center pt-24 md:pt-0">
      {/* Background with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight">
            Infinite Movies, Series & More.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 font-medium max-w-2xl mx-auto">
            Stream your favorite stories today. Explore our vast library of
            award-winning content, exclusive premieres, and timeless classics.
          </p>

          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8"
          >
            <div className="relative w-full md:w-[500px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-5" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search movies, directors, or genres..."
                className="pl-11 h-14 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20 transition-all rounded-full"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="h-14 px-10 rounded-full font-bold text-lg gap-2"
            >
              <Play className="size-5" />
              Start Watching
            </Button>
          </form>

          <div className="pt-12 flex items-center justify-center gap-8 text-sm font-semibold text-gray-400 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <span className="text-primary">10K+</span> Movies
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">5K+</span> Series
            </div>
            <div className="flex items-center gap-2">
              <span className="text-primary">1M+</span> Users
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
