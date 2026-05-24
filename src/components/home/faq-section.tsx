"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/services-data";
import { SectionHeading } from "../ui/section-heading";

export function FaqSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-cream py-20 content-visibility-auto">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="FAQ"
          title="Common questions before a first consultation."
        />
        <div className="grid gap-3">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div key={faq.question} className="rounded-md border border-navy/10 bg-white">
                <button
                  type="button"
                  onClick={() => setActiveIndex(isOpen ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left font-black text-navy"
                >
                  {faq.question}
                  <ChevronDown
                    className={isOpen ? "rotate-180 text-crimson" : "text-muted"}
                    size={20}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? <p className="px-5 pb-5 text-sm leading-7 text-steel">{faq.answer}</p> : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
