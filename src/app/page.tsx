import Hero from "@/components/sections/Hero";
import UpcomingEvents from "@/components/sections/UpcomingEvents";
import AboutPreview from "@/components/sections/AboutPreview";
import GalleryPreview from "@/components/sections/GalleryPreview";
import Testimonials from "@/components/sections/Testimonials";
import JoinCTA from "@/components/sections/JoinCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <UpcomingEvents />
      <AboutPreview />
      <GalleryPreview />
      <Testimonials />
      <JoinCTA />
    </>
  );
}
