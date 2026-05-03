import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const blogs = [
  {
    title: "The Future of Cinema: VR and Beyond",
    excerpt:
      "How virtual reality is changing the way we experience storytelling in the 21st century.",
    date: "May 1, 2024",
    author: "James Wilson",
    image:
      "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=2000&auto=format&fit=crop",
    category: "Technology",
  },
  {
    title: "10 Must-Watch Documentaries This Month",
    excerpt:
      "From deep-sea explorations to historical mysteries, here are the top picks for you.",
    date: "April 28, 2024",
    author: "Sarah Chen",
    image:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=2000&auto=format&fit=crop",
    category: "Recommendations",
  },
  {
    title: "Behind the Scenes: Directing a Blockbuster",
    excerpt:
      "An exclusive interview with the director of the year's biggest sci-fi epic.",
    date: "April 25, 2024",
    author: "Michael Ross",
    image:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2000&auto=format&fit=crop",
    category: "Interview",
  },
];

export default function BlogSection() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
              Latest from PlayTube Blog
            </h2>
            <p className="text-muted-foreground">
              Deep dives into cinema history, technological advancements, and
              exclusive behind-the-scenes content.
            </p>
          </div>
          <Button variant="outline" asChild className="hidden md:flex">
            <Link href="/blog">
              View All Posts <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="group bg-background rounded-2xl overflow-hidden border border-border transition-all hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  width={500}
                  height={500}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="size-3" /> {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="size-3" /> {blog.author}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-6 line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link
                  href={`/blog/${index}`}
                  className="inline-flex items-center text-sm font-bold text-primary group-hover:underline"
                >
                  Read More <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center md:hidden">
          <Button variant="outline" asChild className="w-full">
            <Link href="/blog">
              View All Posts <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
