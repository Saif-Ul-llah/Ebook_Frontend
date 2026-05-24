"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail, Menu, Phone, X } from "lucide-react";
import { BRAND } from "@/lib/constants";
import { serviceColumns, services } from "@/lib/services-data";
import { useUiStore } from "@/store/ui-store";
import { LinkButton } from "../ui/button";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Header() {
  const { isMobileNavOpen, toggleMobileNav, closeMobileNav } = useUiStore();

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-cream/95 backdrop-blur">
      <div className="bg-navy text-white">
        <div className="section-shell flex flex-col gap-2 py-2 text-xs font-bold sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-4">
            <a className="inline-flex items-center gap-2" href={`tel:${BRAND.phone}`}>
              <Phone size={14} aria-hidden="true" />
              {BRAND.phone}
            </a>
            <a className="inline-flex items-center gap-2" href={`mailto:${BRAND.email}`}>
              <Mail size={14} aria-hidden="true" />
              {BRAND.email}
            </a>
          </div>
          <Link className="text-cream underline-offset-4 hover:underline" href="/#manuscript">
            Submit your manuscript brief
          </Link>
        </div>
      </div>

      <div className="section-shell flex min-h-20 items-center justify-between gap-4 py-3">
        <Link className="relative h-12 w-48 shrink-0 sm:w-56" href="/" onClick={closeMobileNav}>
          <Image
            src="/brand/noble_ink_logo_horizontal.svg"
            alt={BRAND.name}
            fill
            priority
            className="object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-7 text-sm font-black uppercase text-navy lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-crimson">
              {item.label}
            </Link>
          ))}
          <div className="group relative">
            <Link href="/services" className="hover:text-crimson">
              Popular
            </Link>
            <div className="invisible absolute right-0 top-full grid w-[720px] grid-cols-3 gap-2 rounded-md border border-navy/10 bg-white p-4 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="rounded-md p-3 normal-case hover:bg-cream"
                >
                  <span className="block text-sm font-black text-navy">{service.title}</span>
                  <span className="mt-1 block text-xs font-semibold text-steel">
                    {service.kicker}
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <div className="group relative">
            <Link href="/services" className="hover:text-crimson">
              All Services
            </Link>
            <div className="invisible absolute right-0 top-full grid w-[900px] grid-cols-5 gap-5 rounded-md border border-navy/10 bg-white p-5 opacity-0 shadow-soft transition group-hover:visible group-hover:opacity-100">
              {serviceColumns.map((column) => (
                <div key={column.title}>
                  <h3 className="text-xs font-black uppercase text-crimson">{column.title}</h3>
                  <div className="mt-3 grid gap-2">
                    {column.items.map((item) => (
                      <Link
                        key={item}
                        href="/#manuscript"
                        className="text-xs font-bold normal-case leading-5 text-steel hover:text-navy"
                      >
                        {item}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LinkButton href="/auth/login" variant="ghost">
            Login
          </LinkButton>
          <LinkButton href="/#manuscript">Consult</LinkButton>
        </div>

        <button
          type="button"
          onClick={toggleMobileNav}
          className="inline-flex size-11 items-center justify-center rounded-md border border-navy/20 text-navy lg:hidden"
          aria-label="Toggle navigation"
        >
          {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {isMobileNavOpen ? (
        <div className="border-t border-navy/10 bg-cream lg:hidden">
          <nav className="section-shell grid gap-2 py-4 text-sm font-black uppercase text-navy">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMobileNav}
                className="rounded-md px-3 py-3 hover:bg-white"
              >
                {item.label}
              </Link>
            ))}
            {serviceColumns.slice(0, 3).map((column) => (
              <div key={column.title} className="rounded-md bg-white/60 p-3">
                <p className="text-xs text-crimson">{column.title}</p>
                <div className="mt-2 flex flex-wrap gap-2 normal-case">
                  {column.items.slice(0, 5).map((item) => (
                    <Link
                      key={item}
                      href="/#manuscript"
                      onClick={closeMobileNav}
                      className="rounded-md bg-creamAlt px-2 py-1 text-xs text-steel"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <LinkButton href="/#manuscript" onClick={closeMobileNav}>
              Consult
            </LinkButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
