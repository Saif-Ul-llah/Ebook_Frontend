import { genreTags } from "@/lib/services-data";
import { SectionHeading } from "../ui/section-heading";

export function GenreCloud() {
  return (
    <section className="bg-creamAlt py-20 content-visibility-auto">
      <div className="section-shell">
        <SectionHeading
          eyebrow="Writing Categories"
          title="Support across genres, formats, and specialist writing needs."
          description="A broad service catalog helps authors find the right starting point without forcing every project into the same package."
        />
        <div className="mt-8 flex flex-wrap gap-3">
          {genreTags.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-navy/10 bg-white px-4 py-3 text-sm font-black uppercase text-steel"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
