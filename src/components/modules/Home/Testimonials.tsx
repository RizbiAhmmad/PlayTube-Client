"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Movie Enthusiast",
    content: "PlayTube has completely changed how I watch movies. The library is massive and the quality is unbeatable.",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    rating: 5
  },
  {
    name: "Michael Chen",
    role: "Tech Reviewer",
    content: "The seamless switching between devices is what sold me. I can start a movie on my TV and finish it on my tablet.",
    avatar: "https://i.pravatar.cc/150?u=michael",
    rating: 5
  },
  {
    name: "Emily Rodriguez",
    role: "Student",
    content: "As a student on a budget, the free tier is amazing, but I eventually upgraded to Premium for the 4K content.",
    avatar: "https://i.pravatar.cc/150?u=emily",
    rating: 4
  }
];

const Testimonials = () => {
  return (
    <section className="py-32 bg-muted/30">
      <div className="container mx-auto px-8">
        <div className="text-center mb-20 space-y-4">
          <h2 className="text-4xl md:text-6xl font-black tracking-tight">
            What Our <span className="text-primary italic">Fans</span> Say.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join millions of happy subscribers who have already discovered their new favorite home for cinema.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, index) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-10 rounded-[2.5rem] border border-border/50 relative group hover:shadow-2xl transition-all duration-300"
            >
              <Quote className="absolute top-8 right-8 size-12 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="size-4 fill-primary text-primary" />
                ))}
              </div>

              <p className="text-lg font-medium leading-relaxed mb-8 italic text-foreground/90">
                &ldquo;{t.content}&rdquo;
              </p>


              <div className="flex items-center gap-4 border-t border-border/50 pt-8">
                <Image 
                  src={t.avatar} 
                  alt={t.name} 
                  width={56}
                  height={56}
                  className="size-14 rounded-2xl object-cover"
                />
                <div>
                  <h4 className="font-bold text-lg leading-none">{t.name}</h4>
                  <p className="text-muted-foreground text-sm mt-1">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
