import Image from "next/image";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import { LinkButton } from "../ui/button";

export function Hero() {
  return (
    <section className="overflow-hidden bg-cream">
      <div className="section-shell grid min-h-[680px] items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full border border-crimson/20 bg-white/60 px-4 py-2 text-xs font-black uppercase text-crimson">
            <Sparkles size={16} aria-hidden="true" />
            Your story. Expertly told.
          </p>
          <h1 className="mt-6 font-serif text-5xl font-black leading-none text-navy sm:text-6xl lg:text-7xl">
            Publishing support for authors ready to be taken seriously.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-steel">
            Noble Ink Studios helps authors move from idea, draft, or manuscript
            to a polished book with writing, editing, design, and launch guidance.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="#manuscript">
              Start a brief <ArrowRight size={18} aria-hidden="true" />
            </LinkButton>
            <LinkButton href="/services" variant="ghost">
              Explore services
            </LinkButton>
          </div>
          <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["10+", "Years experience"],
              ["700+", "Books shaped"],
              ["250+", "Writer network"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-md border border-navy/10 bg-white/60 p-4">
                <div className="font-serif text-3xl font-black text-crimson">{value}</div>
                <div className="mt-1 text-xs font-black uppercase text-steel">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative overflow-hidden rounded-md border border-navy/10 bg-white shadow-soft">
            <Image
              src="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1100&q=85"
              alt="Writer preparing a manuscript at a desk"
              width={1100}
              height={1200}
              priority
              className="h-[520px] w-full object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-md bg-cream/95 p-5 shadow-soft backdrop-blur">
              <div className="flex items-start gap-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-md bg-navy text-white">
                  <FileText size={22} aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase text-crimson">Manuscript review</p>
                  <p className="mt-1 text-sm leading-6 text-steel">
                    Submit your project details and get a practical publishing path.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
