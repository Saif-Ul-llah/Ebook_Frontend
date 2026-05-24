import { AchievementStrip } from "@/components/home/achievement-strip";
import { CtaBand } from "@/components/home/cta-band";
import { FaqSection } from "@/components/home/faq-section";
import { GenreCloud } from "@/components/home/genre-cloud";
import { Hero } from "@/components/home/hero";
import { ManuscriptSection } from "@/components/home/manuscript-section";
import { ProcessSection } from "@/components/home/process-section";
import { ServiceGrid } from "@/components/home/service-grid";
import { StorySection } from "@/components/home/story-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { WhyChooseSection } from "@/components/home/why-choose-section";
import { SiteShell } from "@/components/layout/site-shell";

export default function HomePage() {
  return (
    <SiteShell>
      <Hero />
      <AchievementStrip />
      <StorySection />
      <ServiceGrid />
      <ProcessSection />
      <WhyChooseSection />
      <CtaBand />
      <GenreCloud />
      <TestimonialsSection />
      <FaqSection />
      <ManuscriptSection />
    </SiteShell>
  );
}
