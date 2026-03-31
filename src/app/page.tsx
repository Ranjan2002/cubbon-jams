import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutPreview from "@/components/sections/AboutPreview";
import FeaturedArtists from "@/components/sections/FeaturedArtists";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Testimonials from "@/components/sections/Testimonials";
import Newsletter from "@/components/ui/Newsletter";
import JoinCTA from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <UpcomingEvents />
      <AboutPreview />
      <FeaturedArtists />
      <GalleryPreview />
      <Testimonials />
      <Newsletter />
      <JoinCTA />
    </>
  );
}
