"use client";

import { motion } from "framer-motion";
import { Tv, Download, Users, Monitor } from "lucide-react";

const features = [
  {
    title: "Enjoy on your TV",
    description: "Watch on Smart TVs, Playstation, Xbox, Apple TV, Chromecast, Blu-ray players, and more.",
    icon: <Tv className="size-10 text-primary" />,
  },
  {
    title: "Download & Watch",
    description: "Save your favorites easily and always have something to watch offline.",
    icon: <Download className="size-10 text-blue-500" />,
  },
  {
    title: "Watch Everywhere",
    description: "Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.",
    icon: <Monitor className="size-10 text-primary" />,
  },
  {
    title: "Create Kids Profiles",
    description: "Send kids on adventures with their favorite characters in a space made just for them.",
    icon: <Users className="size-10 text-blue-500" />,
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-background border-y border-border/50">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group text-center space-y-6 p-8 rounded-3xl hover:bg-muted/50 transition-all duration-300"
            >
              <div className="flex justify-center">
                <div className="p-4 bg-muted rounded-2xl group-hover:bg-background transition-colors duration-300">
                  {feature.icon}
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold tracking-tight">{feature.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
