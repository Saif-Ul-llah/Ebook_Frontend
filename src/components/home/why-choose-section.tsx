import { Clock3, PenTool, ShieldCheck, Wand2 } from "lucide-react";
import { whyChoose } from "@/lib/services-data";
import { SectionHeading } from "../ui/section-heading";

const icons = [PenTool, Clock3, Wand2, ShieldCheck];

export function WhyChooseSection() {
  return (
    <section className="bg-white py-20 content-visibility-auto">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Why Choose Noble Ink"
          title="Premium support without losing control of your story."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {whyChoose.map((item, index) => {
            const Icon = icons[index] ?? PenTool;
            return (
              <article key={item.title} className="rounded-md border border-navy/10 bg-cream p-6">
                <div className="flex size-12 items-center justify-center rounded-md bg-crimson text-white">
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-5 font-serif text-2xl font-black text-navy">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{item.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
