import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutPreview from "@/components/sections/AboutPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import FAQ from "@/components/sections/FAQ";
import ExperienceOptions from "@/components/sections/ExperienceOptions";
import InstagramPosts from "@/components/sections/InstagramPosts";
import Newsletter from "@/components/ui/Newsletter";
import JoinCTA from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <UpcomingEvents />
      <ExperienceOptions />
      <AboutPreview />
      <GalleryPreview />
      <InstagramPosts compact />
      <FAQ />
      <Newsletter />
      <JoinCTA />
    </>
  );
}
