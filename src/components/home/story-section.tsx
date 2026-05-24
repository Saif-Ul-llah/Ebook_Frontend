import Image from "next/image";
import { Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { LinkButton } from "../ui/button";
import { SectionHeading } from "../ui/section-heading";

export function StorySection() {
  return (
    <section className="bg-cream py-20 content-visibility-auto">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative overflow-hidden rounded-md border border-navy/10 bg-white shadow-soft">
          <Image
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1100&q=85"
            alt="Bookshelves and reading room"
            width={1100}
            height={900}
            className="h-[500px] w-full object-cover"
          />
        </div>
        <div>
          <SectionHeading
            eyebrow="Storytelling Solution"
            title="Turning pages into work readers remember."
            description="Whether you are an entrepreneur, memoirist, fiction writer, or expert with a message, Noble Ink Studios helps transform raw ideas into structured manuscripts and publication-ready assets."
          />
          <p className="mt-5 text-base leading-8 text-steel">
            The process keeps your vision intact while pairing it with writers,
            editors, designers, and publishing specialists who understand how books
            move from private drafts to public shelves.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/#manuscript">Free Consultation</LinkButton>
            <a
              href={`tel:${BRAND.phone}`}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-navy/20 bg-white px-5 py-3 text-sm font-black uppercase text-navy hover:text-crimson"
            >
              <Phone size={17} aria-hidden="true" />
              {BRAND.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
