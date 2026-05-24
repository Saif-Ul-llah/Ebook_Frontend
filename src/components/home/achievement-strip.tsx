import Image from "next/image";
import { achievementBadges } from "@/lib/services-data";

export function AchievementStrip() {
  return (
    <section className="border-y border-navy/10 bg-white">
      <div className="section-shell grid gap-3 py-5 sm:grid-cols-2 lg:grid-cols-5">
        {achievementBadges.map(([value, lineOne, lineTwo]) => (
          <div
            key={`${value}-${lineOne}`}
            className="flex min-h-24 items-center gap-4 rounded-md bg-cream px-4 py-3"
          >
            <div className="relative size-12 shrink-0">
              <Image
                src="/brand/noble_ink_logo_master.svg"
                alt=""
                fill
                className="object-contain"
              />
            </div>
            <div>
              <div className="font-serif text-3xl font-black leading-none text-crimson">
                {value}
              </div>
              <div className="mt-1 text-xs font-black uppercase leading-4 text-navy">
                {lineOne}
                <br />
                {lineTwo}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
