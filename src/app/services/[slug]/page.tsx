import { notFound } from "next/navigation";
import { ManuscriptSection } from "@/components/home/manuscript-section";
import { SiteShell } from "@/components/layout/site-shell";
import { LinkButton } from "@/components/ui/button";
import { services } from "@/lib/services-data";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="bg-cream py-16">
        <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.8fr]">
          <div>
            <p className="text-sm font-black uppercase text-crimson">{service.kicker}</p>
            <h1 className="mt-3 font-serif text-5xl font-black leading-tight text-navy">
              {service.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-steel">{service.description}</p>
            <div className="mt-8">
              <LinkButton href="/#manuscript">Start a brief</LinkButton>
            </div>
          </div>
          <div className="rounded-md border border-navy/10 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-black uppercase text-navy">Included focus areas</h2>
            <div className="mt-5 grid gap-3">
              {service.features.map((feature) => (
                <div key={feature} className="rounded-md bg-cream px-4 py-3 text-sm font-black text-steel">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ManuscriptSection />
    </SiteShell>
  );
}
