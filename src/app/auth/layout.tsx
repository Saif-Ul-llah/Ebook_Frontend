import Image from "next/image";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="grid min-h-screen bg-cream lg:grid-cols-[0.9fr_1.1fr]">
      <section className="flex items-center justify-center px-5 py-10">{children}</section>
      <section className="relative hidden overflow-hidden bg-navy lg:block">
        <Image
          src="https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1200&q=85"
          alt="Library shelves for Noble Ink Studios"
          fill
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy/85 to-crimson/60" />
        <div className="absolute inset-x-12 bottom-12 text-white">
          <div className="relative h-24 w-80">
            <Image
              src="/brand/noble_ink_logo_dark.svg"
              alt="Noble Ink Studios"
              fill
              className="object-contain object-left"
            />
          </div>
          <p className="mt-6 max-w-xl font-serif text-5xl font-black leading-tight">
            Your manuscript workbench starts here.
          </p>
        </div>
      </section>
    </main>
  );
}
