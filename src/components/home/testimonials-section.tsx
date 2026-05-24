import { Quote } from "lucide-react";
import { testimonials } from "@/lib/services-data";
import { SectionHeading } from "../ui/section-heading";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20 content-visibility-auto">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Authors"
          title="Built for people who want the book to feel unmistakably theirs."
          align="center"
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.name} className="rounded-md border border-navy/10 bg-cream p-6">
              <Quote className="text-crimson" size={28} aria-hidden="true" />
              <blockquote className="mt-5 text-base font-semibold leading-8 text-navy">
                &quot;{item.quote}&quot;
              </blockquote>
              <figcaption className="mt-6">
                <div className="font-black text-navy">{item.name}</div>
                <div className="text-sm font-semibold text-steel">{item.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
