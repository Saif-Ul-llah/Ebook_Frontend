"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getAdminManuscripts } from "@/lib/api";
import type { Manuscript } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";

export function AdminManuscripts() {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [items, setItems] = useState<Manuscript[]>([]);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    if (user?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }

    startTransition(async () => {
      try {
        const result = await getAdminManuscripts(token);
        setItems(result.data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load manuscripts.");
      }
    });
  }, [hasHydrated, router, token, user?.role]);

  return (
    <main className="min-h-screen bg-cream">
      <div className="section-shell py-8">
        <Link href="/admin" className="text-sm font-black uppercase text-crimson">
          Back to overview
        </Link>
        <h1 className="mt-4 font-serif text-5xl font-black text-navy">All manuscript briefs</h1>
        {isPending ? <p className="mt-6 font-bold text-steel">Loading manuscripts...</p> : null}
        {message ? <p className="mt-6 font-bold text-crimson">{message}</p> : null}
        <div className="mt-8 grid gap-4">
          {items.map((item) => (
            <article key={item.id} className="rounded-md border border-navy/10 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-crimson">{item.serviceType}</p>
                  <h2 className="mt-2 font-serif text-3xl font-black text-navy">{item.projectTitle}</h2>
                  <p className="mt-2 text-sm font-semibold text-steel">
                    {item.fullName} {item.lastName} · {item.email} · {item.phoneNumber}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-steel">{item.genre}</p>
                </div>
                <span className="rounded-md bg-cream px-3 py-2 text-xs font-black uppercase text-navy">
                  {item.status}
                </span>
              </div>
              {item.message ? <p className="mt-4 text-sm leading-7 text-steel">{item.message}</p> : null}
              {item.fileName ? (
                <p className="mt-4 text-sm font-black text-navy">
                  File:{" "}
                  {item.fileUrl ? (
                    <a className="text-crimson hover:text-deepCrimson" href={item.fileUrl} target="_blank">
                      {item.fileName}
                    </a>
                  ) : (
                    item.fileName
                  )}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
