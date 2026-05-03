import FeaturedMedia from "@/components/modules/Home/FeaturedMedia";
import Hero from "@/components/modules/Home/Hero";
import Pricing from "@/components/modules/Home/Pricing";
import CTA from "@/components/modules/Home/CTA";
import Features from "@/components/modules/Home/Features";
import Testimonials from "@/components/modules/Home/Testimonials";
import StatsSection from "@/components/modules/Home/StatsSection";
import FAQ from "@/components/modules/Home/FAQ";
import Newsletter from "@/components/modules/Home/Newsletter";
import BlogSection from "@/components/modules/Home/BlogSection";
import { getMediaList } from "@/services/media.services";
import { IMedia } from "@/types/media.types";

export default async function Home() {
  let allMedia: IMedia[] = [];

  try {
    const res = await getMediaList("limit=100");
    if (res && Array.isArray(res.data)) {
      allMedia = res.data;
    }
  } catch (error) {
    console.error("Failed to load home page data:", error);
  }

  // Locally categorize and sort media data for a better UX
  // 1. Newly Added (Sort by createdAt or id)
  const newlyAddedMedia = [...allMedia]
    .sort(
      (a, b) =>
        new Date(b.createdAt || "").getTime() -
        new Date(a.createdAt || "").getTime(),
    )
    .slice(0, 6);

  // 2. Top Rated (Sort by averageRating, fallback to releaseYear)
  const topRatedMedia = [...allMedia]
    .sort(
      (a, b) =>
        (b.averageRating || 0) - (a.averageRating || 0) ||
        b.releaseYear - a.releaseYear,
    )
    .slice(0, 6);

  // 3. Editor's Picks (Just a shuffled or different slice)
  const editorsPicks = [...allMedia]
    .filter((m) => !newlyAddedMedia.includes(m))
    .slice(0, 4);

  // 4. Premium Selection (Explicitly filtered)
  const premiumMedia = allMedia
    .filter((m) => m.pricingType === "PREMIUM")
    .slice(0, 6);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <div className="space-y-4">
        {newlyAddedMedia.length > 0 && (
          <FeaturedMedia
            title="Newly Added"
            description="The latest blockbusters and series added recently to our library."
            mediaList={newlyAddedMedia}
            viewAllLink="/media"
          />
        )}

        {topRatedMedia.length > 0 && (
          <FeaturedMedia
            title="Top Rated This Week"
            description="Critics' choices and fan favorites that are making waves right now."
            mediaList={topRatedMedia}
            viewAllLink="/media"
          />
        )}

        {premiumMedia.length > 0 && (
          <FeaturedMedia
            title="Premium Collection"
            description="Exclusive content for our premium subscribers. Experience cinema at its best."
            mediaList={premiumMedia}
            viewAllLink="/media"
          />
        )}

        {editorsPicks.length > 0 && (
          <FeaturedMedia
            title="Editor’s Picks"
            description="Hand-picked recommendations from our team of cinema experts."
            mediaList={editorsPicks}
            viewAllLink="/media"
          />
        )}
      </div>

      <StatsSection />

      <Features />

      <BlogSection />

      <Testimonials />

      <FAQ />

      <Newsletter />

      <Pricing />

      <CTA />
    </div>
  );
}
