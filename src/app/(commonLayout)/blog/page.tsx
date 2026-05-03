import { blogPosts } from "@/constants/blogData";
import { ArrowRight, Calendar, User, Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogListingPage() {
  return (
    <div className="min-h-screen py-16 bg-background">
      {/* Header */}
      <div className="container mx-auto px-4 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Stay updated with the latest trends in cinema, exclusive behind-the-scenes content, 
          and expert recommendations.
        </p>
        
        {/* Search Bar */}
        <div className="mt-12 max-w-xl mx-auto relative">
          <Input 
            placeholder="Search for articles..." 
            className="h-12 pl-12 rounded-full border-border bg-muted/50 focus-visible:ring-primary"
          />
          <Search className="absolute left-4 top-3.5 size-5 text-muted-foreground" />
        </div>
      </div>

      {/* Featured Post (Optional, but let's take the first one) */}
      <div className="container mx-auto px-4 mb-24">
        <div className="group relative overflow-hidden rounded-3xl border border-border bg-card shadow-lg transition-all hover:shadow-2xl">
          <div className="flex flex-col lg:flex-row">
            <div className="lg:w-1/2 overflow-hidden">
              <Image 
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                width={1200}
                height={800}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-8 lg:p-16 lg:w-1/2 flex flex-col justify-center">
              <span className="inline-block px-3 py-1 mb-6 text-xs font-bold uppercase tracking-wider bg-primary text-primary-foreground rounded-full w-fit">
                Featured Post
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-primary transition-colors">
                {blogPosts[0].title}
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                {blogPosts[0].excerpt}
              </p>
              <div className="flex items-center gap-6 mb-10 text-sm text-muted-foreground">
                <span className="flex items-center gap-2"><Calendar className="size-4" /> {blogPosts[0].date}</span>
                <span className="flex items-center gap-2"><User className="size-4" /> {blogPosts[0].author}</span>
              </div>
              <Button asChild size="lg" className="w-fit font-bold">
                <Link href={`/blog/${blogPosts[0].id}`}>
                  Read Full Article <ArrowRight className="ml-2 size-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* All Posts Grid */}
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-12 flex items-center gap-3">
          Latest Articles
          <span className="h-px flex-1 bg-border ml-4"></span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((blog) => (
            <article key={blog.id} className="group flex flex-col bg-card rounded-2xl overflow-hidden border border-border shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
              <div className="relative h-56 w-full overflow-hidden">
                <Image 
                  src={blog.image}
                  alt={blog.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                    {blog.category}
                  </span>
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><Calendar className="size-3" /> {blog.date}</span>
                  <span className="flex items-center gap-1"><User className="size-3" /> {blog.author}</span>
                </div>
                <h3 className="text-xl font-bold mb-4 line-clamp-2 group-hover:text-primary transition-colors">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-8 line-clamp-3 leading-relaxed flex-1">
                  {blog.excerpt}
                </p>
                <Link 
                  href={`/blog/${blog.id}`} 
                  className="mt-auto inline-flex items-center text-sm font-bold text-primary group-hover:underline"
                >
                  Read More <ArrowRight className="ml-2 size-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
