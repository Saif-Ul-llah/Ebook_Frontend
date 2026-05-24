import Link from "next/link";
import { ArrowUpRight, BookOpen, Megaphone, Mic, Palette, PenLine, ScanText } from "lucide-react";
import { services } from "@/lib/services-data";
import { SectionHeading } from "../ui/section-heading";

const icons = [PenLine, ScanText, Palette, BookOpen, Megaphone, Mic];

export function ServiceGrid() {
  return (
    <section className="bg-white py-20 content-visibility-auto">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Services"
          title="Every step from rough draft to reader-ready release."
          description="Choose a focused service or combine writing, editing, design, and publishing support into a single author plan."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = icons[index] ?? BookOpen;
            return (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group rounded-md border border-navy/10 bg-cream p-6 transition hover:-translate-y-1 hover:border-crimson/40 hover:shadow-soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex size-12 items-center justify-center rounded-md bg-navy text-white">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <ArrowUpRight className="text-muted group-hover:text-crimson" size={22} aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-serif text-2xl font-black text-navy">{service.title}</h3>
                <p className="mt-3 text-sm leading-7 text-steel">{service.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
