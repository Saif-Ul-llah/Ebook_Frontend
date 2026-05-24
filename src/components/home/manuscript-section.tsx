import { ManuscriptForm } from "../forms/manuscript-form";
import { SectionHeading } from "../ui/section-heading";

export function ManuscriptSection() {
  return (
    <section className="bg-creamAlt py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
        <SectionHeading
          eyebrow="Consultation"
          title="Tell us where your book stands today."
          description="Share the key details and Noble Ink Studios will treat the next step like an editorial decision, not a sales script."
        />
        <ManuscriptForm />
      </div>
    </section>
  );
}
