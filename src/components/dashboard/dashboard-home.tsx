"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { FileText, LogOut, PlusCircle } from "lucide-react";
import { getMyManuscripts } from "@/lib/api";
import type { Manuscript } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";
import { Button, LinkButton } from "../ui/button";

export function DashboardHome() {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);
  const [manuscripts, setManuscripts] = useState<Manuscript[]>([]);
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

    startTransition(async () => {
      try {
        const result = await getMyManuscripts(token);
        setManuscripts(result.data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load manuscripts.");
      }
    });
  }, [hasHydrated, router, token]);

  return (
    <main className="min-h-screen bg-cream">
      <div className="section-shell py-8">
        <div className="flex flex-col gap-4 border-b border-navy/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-black uppercase text-navy">
            Noble Ink Studios
          </Link>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            <LogOut size={17} aria-hidden="true" />
            Logout
          </Button>
        </div>

        <section className="py-10">
          <p className="text-sm font-black uppercase text-crimson">Customer dashboard</p>
          <h1 className="mt-3 font-serif text-5xl font-black text-navy">Your publishing briefs</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-steel">
            Track submitted manuscript metadata and start a new brief when your next project is ready.
          </p>
          <div className="mt-6">
            <LinkButton href="/#manuscript">
              <PlusCircle size={18} aria-hidden="true" />
              New brief
            </LinkButton>
          </div>
        </section>

        <section className="grid gap-4">
          {!hasHydrated ? <p className="font-bold text-steel">Restoring session...</p> : null}
          {isPending ? <p className="font-bold text-steel">Loading manuscripts...</p> : null}
          {message ? <p className="font-bold text-crimson">{message}</p> : null}
          {!isPending && manuscripts.length === 0 ? (
            <div className="rounded-md border border-navy/10 bg-white p-8 text-center shadow-soft">
              <FileText className="mx-auto text-crimson" size={36} aria-hidden="true" />
              <h2 className="mt-4 font-serif text-3xl font-black text-navy">No briefs yet</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-steel">
                Submit a manuscript brief from the homepage to see it listed here.
              </p>
            </div>
          ) : null}
          {manuscripts.map((item) => (
            <article key={item.id} className="rounded-md border border-navy/10 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-black uppercase text-crimson">{item.serviceType}</p>
                  <h2 className="mt-2 font-serif text-3xl font-black text-navy">{item.projectTitle}</h2>
                  <p className="mt-2 text-sm font-semibold text-steel">{item.genre}</p>
                </div>
                <span className="rounded-md bg-cream px-3 py-2 text-xs font-black uppercase text-navy">
                  {item.status}
                </span>
              </div>
              {item.message ? <p className="mt-4 text-sm leading-7 text-steel">{item.message}</p> : null}
              {item.fileName ? (
                <p className="mt-4 text-sm font-black text-navy">
                  Manuscript file:{" "}
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
        </section>
      </div>
    </main>
  );
}
