import { getMediaById } from "@/services/media.services";
import { getUserInfo } from "@/services/auth.services";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Film, Play, Star, Users, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BuyNowButton from "@/components/modules/Media/BuyNowButton";
import ReviewForm from "@/components/modules/Media/ReviewForm";
import ReviewList from "@/components/modules/Media/ReviewList";

interface MediaDetailsPageProps {
  params: Promise<{ id: string }>;
}

const MediaDetailsPage = async ({ params }: MediaDetailsPageProps) => {
  const { id } = await params;
  const { data: media } = await getMediaById(id);
  const user = await getUserInfo();

  if (!media) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Backdrop */}
      <div className="relative h-[60vh] w-full overflow-hidden md:h-[70vh]">
        <Image
          src={media.thumbnail}
          alt={media.title}
          fill
          sizes="100vw"
          className="object-cover blur-2xl brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />

        <div className="container relative mx-auto flex h-full items-end px-4 pb-12">
          <div className="grid w-full gap-8 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
            {/* Poster Card */}
            <div className="relative hidden aspect-[3/4] overflow-hidden rounded-2xl border-4 border-background shadow-2xl md:block">
              <Image
                src={media.thumbnail}
                alt={media.title}
                fill
                sizes="(max-width: 768px) 0px, (max-width: 1200px) 300px, 350px"
                className="object-cover"
              />
              <div className="absolute left-3 top-3">
                <Badge className="bg-primary/90 text-sm">{media.type}</Badge>
              </div>
            </div>

            {/* Title Info */}
            <div className="flex flex-col justify-end space-y-6">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge
                    variant="outline"
                    className="border-primary/50 text-xs text-primary backdrop-blur-md"
                  >
                    {media.pricingType}
                  </Badge>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-amber-400">
                    <Star className="size-4 fill-current" />
                    <span>{media.averageRating?.toFixed(1) || "0.0"}</span>
                    <span className="text-xs text-muted-foreground font-medium">
                      ({media.reviewCount || 0} reviews)
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Calendar className="size-4" />
                    <span>{media.releaseYear}</span>
                  </div>
                </div>
                <h1 className="text-4xl font-black tracking-tighter sm:text-5xl lg:text-7xl">
                  {media.title}
                </h1>
              </div>

              <div className="flex flex-wrap gap-2">
                {media.genres.map((genre) => (
                  <Badge
                    key={genre}
                    variant="secondary"
                    className="px-4 py-1.5 text-xs font-semibold uppercase tracking-wider"
                  >
                    {genre}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 pt-4">
                {media.pricingType === "PREMIUM" ? (
                  <BuyNowButton
                    mediaId={media.id}
                    amount={media.price || 0}
                    userId={user?.id}
                  />
                ) : (
                  <Link href={media.streamingUrl} target="_blank">
                    <Button
                      size="lg"
                      className="h-14 gap-3 bg-primary px-8 text-lg font-bold shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
                    >
                      <Play className="size-6 fill-current" />
                      Start Watching
                    </Button>
                  </Link>
                )}

                {media.trailerUrl && (
                  <Link href={media.trailerUrl} target="_blank">
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 gap-3 border-white/20 bg-white/10 px-8 text-lg font-bold backdrop-blur-md hover:bg-white/20 transition-all"
                    >
                      <Video className="size-6" />
                      Watch Trailer
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-16 lg:grid-cols-[1fr_350px]">
          {/* Main Info */}
          <div className="space-y-12">
            <section className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tight border-l-4 border-primary pl-4">
                Synopsis
              </h2>
              <div 
                className="text-lg leading-relaxed text-muted-foreground/90 prose dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: media.description }}
              />
            </section>

            <section className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight border-l-4 border-primary pl-4 flex items-center gap-3">
                <Users className="size-8 text-primary" />
                Cast & Crew
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border bg-muted/30 p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    Director
                  </p>
                  <p className="text-xl font-semibold">{media.director}</p>
                </div>
                <div className="rounded-2xl border bg-muted/30 p-6 shadow-sm">
                  <p className="text-sm font-bold uppercase tracking-widest text-primary mb-2">
                    Main Cast
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {media.cast.map((person) => (
                      <span
                        key={person}
                        className="inline-flex items-center rounded-full bg-background px-3 py-1 text-sm font-medium border"
                      >
                        {person}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Reviews Section */}
            <section className="space-y-8 pt-8 mt-12 border-t">
              <h2 className="text-3xl font-bold tracking-tight border-l-4 border-primary pl-4 flex items-center gap-3">
                <Star className="size-8 text-primary" />
                User Reviews
              </h2>

              <div className="flex flex-col-reverse lg:flex-row gap-12 items-start">
                <div className="flex-1 w-full">
                  <ReviewList mediaId={media.id} currentUserId={user?.id} />
                </div>

                {/* Form or Login Prompt */}
                <div className="w-full lg:w-[400px] shrink-0 sticky top-24">
                  {user ? (
                    <ReviewForm mediaId={media.id} />
                  ) : (
                    <div className="rounded-2xl border bg-card/50 p-8 text-center flex flex-col justify-center items-center shadow-sm">
                      <Star className="size-12 text-muted-foreground/30 mb-4" />
                      <h3 className="text-xl font-bold mb-2">Write a Review</h3>
                      <p className="text-sm text-muted-foreground mb-6">
                        You must be logged in to share your thoughts with the
                        community.
                      </p>
                      <Link href="/login">
                        <Button className="w-full rounded-full gap-2">
                          Log In to Review
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Additional Info */}
          <aside className="space-y-8">
            <div className="rounded-3xl border bg-card p-8 shadow-xl">
              <h3 className="mb-6 text-xl font-bold">Media Information</h3>
              <div className="space-y-6">
                <div className="flex justify-between border-b pb-4">
                  <span className="text-muted-foreground">Type</span>
                  <span className="font-semibold">{media.type}</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                  <span className="text-muted-foreground">Release Year</span>
                  <span className="font-semibold">{media.releaseYear}</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                  <span className="text-muted-foreground">Language</span>
                  <span className="font-semibold">English</span>
                </div>
                <div className="flex justify-between border-b pb-4">
                  <span className="text-muted-foreground">Price</span>
                  <span className="font-bold text-primary">
                    {media.pricingType === "FREE" ? "FREE" : `$${media.price}`}
                  </span>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-muted/50 p-4 text-center">
                <p className="text-sm italic text-muted-foreground">
                  Available to stream on PlayTube in Full HD and 4K quality.
                </p>
              </div>
            </div>

            <div className="rounded-3xl bg-primary/5 p-8 border border-primary/10">
              <div className="flex items-center gap-3 mb-4">
                <Film className="size-6 text-primary" />
                <h4 className="font-bold">Streaming Quality</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Enjoy cinematic experience with 4K UHD and Dolby Atmos and HDR
                support.
              </p>
              <div className="flex gap-2">
                <Badge variant="outline">4K</Badge>
                <Badge variant="outline">HDR</Badge>
                <Badge variant="outline">5.1</Badge>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MediaDetailsPage;
