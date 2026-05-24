import { CheckCircle2 } from "lucide-react";
import { SectionHeading } from "../ui/section-heading";

const steps = [
  "Share your manuscript stage, goals, genre, and publishing timeline.",
  "Receive a recommended service path and realistic project milestones.",
  "Collaborate with specialists on writing, editing, cover, formatting, or launch.",
  "Move toward publication with polished assets and a clear next-step plan.",
];

export function ProcessSection() {
  return (
    <section className="bg-creamAlt py-20 content-visibility-auto">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHeading
          eyebrow="Process"
          title="A practical path for authors who need clarity."
          description="The workflow is built to reduce uncertainty, keep momentum visible, and match the right experts to the right stage of your book."
        />
        <div className="grid gap-4">
          {steps.map((step, index) => (
            <div key={step} className="flex gap-5 rounded-md border border-navy/10 bg-white p-5">
              <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-crimson text-white">
                <CheckCircle2 size={22} aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-black uppercase text-muted">Step {index + 1}</p>
                <p className="mt-1 text-base font-bold leading-7 text-navy">{step}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
