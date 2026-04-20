"use client";

import { motion } from "framer-motion";
import { Film, PlayCircle, Users, Globe, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";

const AboutPage = () => {
  const stats = [
    { label: "Movies & Series", value: "15,000+", icon: <Film className="size-6" /> },
    { label: "Active Users", value: "2 Million+", icon: <Users className="size-6" /> },
    { label: "Countries", value: "190+", icon: <Globe className="size-6" /> },
    { label: "Awards Won", value: "50+", icon: <Award className="size-6" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5 -skew-y-6 origin-top-left" />
        <div className="container relative z-10 mx-auto px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wide uppercase">
                <PlayCircle className="size-4" />
                Our Story
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
                Reimagining the <span className="text-primary italic">Cinematic</span> Experience.
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl leading-relaxed max-w-3xl">
                PlayTube started with a simple idea: make the world&apos;s best stories accessible to everyone, 
                everywhere, with zero compromise on quality and user experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="py-20 border-y border-border/50">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="flex justify-center text-primary">{stat.icon}</div>
                <div>
                  <div className="text-4xl font-black">{stat.value}</div>
                  <div className="text-muted-foreground font-semibold uppercase tracking-widest text-xs mt-2">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-32">
        <div className="container mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
                Our Mission is to <span className="text-primary font-serif italic">Inspire</span> Every Viewer.
              </h2>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p>
                  At PlayTube, we believe that great stories shouldn&apos;t just be watched—they should be experienced. 
                  We&apos;ve spent thousands of hours perfecting our streaming infrastructure to ensure that every pixel 
                  and every sound wave reaches you exactly as the filmmakers intended.
                </p>
                <p>
                  Whether it&apos;s an indie documentary or a high-budget sci-fi epic, we provide the platform for creators 
                  to shine and for audiences to be transported to different worlds.
                </p>
              </div>
              <div className="flex items-center gap-4 p-6 bg-muted rounded-3xl border border-border/50">
                <ShieldCheck className="size-10 text-primary" />
                <div>
                  <h4 className="font-bold text-lg">Safe & Secure</h4>
                  <p className="text-muted-foreground text-sm">We prioritize your data privacy and security above everything else.</p>
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 rounded-[3rem] -rotate-3 transition-transform group-hover:rotate-0" />
              <Image 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
                alt="Our Team" 
                width={2070}
                height={1380}
                className="relative rounded-[3rem] shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
