import { ServiceGrid } from "@/components/home/service-grid";
import { ManuscriptSection } from "@/components/home/manuscript-section";
import { SiteShell } from "@/components/layout/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ServicesPage() {
  return (
    <SiteShell>
      <section className="bg-cream py-16">
        <div className="section-shell">
          <SectionHeading
            eyebrow="Noble Ink Services"
            title="Choose the support your manuscript needs next."
            description="From raw ideas to release-ready books, each service is built to give authors professional momentum."
          />
        </div>
      </section>
      <ServiceGrid />
      <ManuscriptSection />
    </SiteShell>
  );
}
