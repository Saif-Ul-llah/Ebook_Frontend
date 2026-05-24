import Image from "next/image";
import Link from "next/link";
import { BRAND } from "@/lib/constants";
import { serviceColumns, services } from "@/lib/services-data";

export function Footer() {
  return (
    <footer className="bg-darkNavy text-white">
      <div className="section-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_2fr_0.9fr]">
        <div>
          <div className="relative h-20 w-64">
            <Image
              src="/brand/noble_ink_logo_dark.svg"
              alt={BRAND.name}
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-cream">
            Your story. Expertly told. Writing, editing, design, and launch support
            for authors building serious books.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-3">
          {serviceColumns.slice(0, 3).map((column) => (
            <div key={column.title}>
              <h3 className="text-sm font-black uppercase text-cream">{column.title}</h3>
              <div className="mt-4 grid gap-3 text-sm text-grayBlue">
                {column.items.slice(0, 6).map((item) => (
                  <Link key={item} href="/#manuscript" className="hover:text-white">
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="sm:col-span-3">
            <h3 className="text-sm font-black uppercase text-cream">Core Services</h3>
            <div className="mt-4 flex flex-wrap gap-2 text-sm text-grayBlue">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-md border border-white/10 px-3 py-2 hover:text-white"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-sm font-black uppercase text-cream">Contact</h3>
          <div className="mt-4 grid gap-3 text-sm leading-7 text-grayBlue">
            <a href={`tel:${BRAND.phone}`} className="hover:text-white">
              {BRAND.phone}
            </a>
            <a href={`mailto:${BRAND.email}`} className="hover:text-white">
              {BRAND.email}
            </a>
            <p>{BRAND.address}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4">
        <div className="section-shell text-xs font-semibold text-grayBlue">
          (c) 2026 {BRAND.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
