import { MessageCircle, Phone } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { LinkButton } from "../ui/button";

export function CtaBand() {
  return (
    <section className="bg-navy py-14 text-white">
      <div className="section-shell flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-black uppercase text-cream">Struggling to write a book on your own?</p>
          <h2 className="mt-3 max-w-3xl font-serif text-4xl font-black leading-tight">
            Work with experienced publishing specialists before the draft stalls.
          </h2>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
          <a
            href={`tel:${BRAND.phone}`}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black uppercase text-navy hover:text-crimson"
          >
            <Phone size={17} aria-hidden="true" />
            Call Us
          </a>
          <LinkButton href="/#manuscript">
            <MessageCircle size={17} aria-hidden="true" />
            Live Chat
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
