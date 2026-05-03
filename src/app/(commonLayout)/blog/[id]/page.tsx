"use client";

import { use } from "react";
import { blogPosts } from "@/constants/blogData";
import { ArrowLeft, Calendar, Clock, Share2 } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";

export default function BlogDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen pb-24 bg-background">
      {/* Article Hero */}
      <div className="relative w-full h-[50vh] md:h-[65vh] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full">
          <div className="container mx-auto px-4 pb-12">
            <Button
              asChild
              variant="ghost"
              className="mb-8 hover:bg-white/10 text-white md:text-foreground"
            >
              <Link href="/blog">
                <ArrowLeft className="mr-2 size-4" /> Back to Blog
              </Link>
            </Button>
            <div className="max-w-4xl">
              <span className="inline-block px-4 py-1 mb-6 text-sm font-bold bg-primary text-primary-foreground rounded-full">
                {post.category}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium">
                <div className="flex items-center gap-2">
                  <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground border-l border-border pl-6">
                  <Calendar className="size-4" /> {post.date}
                </div>
                <div className="flex items-center gap-2 text-muted-foreground border-l border-border pl-6">
                  <Clock className="size-4" /> 8 min read
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 mt-16">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Main Content */}
          <main className="lg:w-2/3">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-12 font-medium italic border-l-4 border-primary pl-8 py-2">
                {post.excerpt}
              </p>

              <div className="space-y-8 text-lg leading-loose text-foreground/90">
                {post.content.split("\n\n").map((paragraph, index) => (
                  <p key={index}>{paragraph.trim()}</p>
                ))}
              </div>

              <div className="my-16 p-8 rounded-3xl bg-muted/30 border border-border">
                <h3 className="text-2xl font-bold mb-4">Key Takeaways</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 list-none p-0">
                  <li className="flex gap-3 items-start">
                    <span className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-1 shrink-0">
                      1
                    </span>
                    <span>
                      Technology is redefining the boundaries of cinematic
                      immersion.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-1 shrink-0">
                      2
                    </span>
                    <span>
                      Viewer participation is becoming central to modern
                      storytelling.
                    </span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="size-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs mt-1 shrink-0">
                      3
                    </span>
                    <span>
                      The gap between passive watching and active experiencing
                      is closing.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Tags/Sharing */}
              <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-muted rounded-md text-sm">
                    #Cinema
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-md text-sm">
                    #FutureTech
                  </span>
                  <span className="px-3 py-1 bg-muted rounded-md text-sm">
                    #Storytelling
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                    Share Article:
                  </span>
                  <div className="flex gap-2">
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full hover:bg-blue-500 hover:text-white border-border"
                    >
                      <FaFacebookF className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full hover:bg-sky-400 hover:text-white border-border"
                    >
                      <FaTwitter className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full hover:bg-blue-600 hover:text-white border-border"
                    >
                      <FaLinkedinIn className="size-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="rounded-full border-border"
                    >
                      <Share2 className="size-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </main>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="sticky top-24 space-y-12">
              {/* Author Card */}
              <div className="p-8 rounded-3xl border border-border bg-card shadow-sm">
                <h4 className="text-lg font-bold mb-6">About the Author</h4>
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-xl">{post.author}</div>
                    <div className="text-sm text-muted-foreground">
                      Lead Cinema Analyst
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  James has over 15 years of experience in film criticism and
                  emerging media technologies.
                </p>
                <Button variant="outline" className="w-full">
                  View Profile
                </Button>
              </div>

              {/* Related Posts */}
              <div>
                <h4 className="text-lg font-bold mb-8">Related Articles</h4>
                <div className="space-y-6">
                  {blogPosts
                    .filter((p) => p.id !== post.id)
                    .slice(0, 3)
                    .map((related) => (
                      <Link
                        key={related.id}
                        href={`/blog/${related.id}`}
                        className="group flex gap-4"
                      >
                        <div className="relative size-20 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={related.image}
                            alt={related.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-110"
                          />
                        </div>
                        <div>
                          <h5 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                            {related.title}
                          </h5>
                          <span className="text-xs text-muted-foreground">
                            {related.date}
                          </span>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>

              {/* Newsletter Small */}
              <div className="p-8 rounded-3xl bg-primary text-primary-foreground">
                <h4 className="text-xl font-bold mb-4">Never miss an update</h4>
                <p className="text-primary-foreground/80 mb-6 text-sm">
                  Get our latest cinema tech insights delivered directly to your
                  inbox.
                </p>
                <form
                  className="space-y-3"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input
                    className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 text-sm"
                    placeholder="your@email.com"
                  />
                  <Button variant="secondary" className="w-full font-bold">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
