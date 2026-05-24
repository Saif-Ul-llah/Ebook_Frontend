"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  Activity,
  BarChart3,
  FileText,
  LogOut,
  ShieldCheck,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";
import { getAdminOverview } from "@/lib/api";
import type { AdminOverview } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "../ui/button";

export function AdminDashboard() {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const logout = useAuthStore((state) => state.logout);
  const [overview, setOverview] = useState<AdminOverview | null>(null);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!hasHydrated) {
      return;
    }

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    if (user?.role !== "ADMIN") {
      router.replace("/dashboard");
      return;
    }

    startTransition(async () => {
      try {
        const result = await getAdminOverview(token);
        setOverview(result.data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load admin overview.");
      }
    });
  }, [hasHydrated, router, token, user?.role]);

  const totals = overview?.totals;
  const statuses = overview?.statuses;

  return (
    <main className="min-h-screen bg-cream">
      <div className="section-shell py-8">
        <header className="flex flex-col gap-4 border-b border-navy/10 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <Link href="/" className="text-xl font-black uppercase text-navy">
            Noble Ink Admin
          </Link>
          <div className="flex gap-3">
            <Button type="button" variant="ghost" onClick={() => router.push("/")}>
              View Site
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                logout();
                router.push("/admin/login");
              }}
            >
              <LogOut size={17} aria-hidden="true" />
              Logout
            </Button>
          </div>
        </header>

        <section className="py-10">
          <p className="inline-flex items-center gap-2 text-sm font-black uppercase text-crimson">
            <ShieldCheck size={18} aria-hidden="true" />
            Protected admin dashboard
          </p>
          <h1 className="mt-3 font-serif text-5xl font-black text-navy">
            Analytics, monitoring, and project overview
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-steel">
            Monitor customer demand, manuscript intake, service interest, and recent
            project activity from a single admin workspace.
          </p>
        </section>

        {!hasHydrated ? <p className="font-bold text-steel">Restoring admin session...</p> : null}
        {isPending ? <p className="font-bold text-steel">Loading analytics...</p> : null}
        {message ? <p className="font-bold text-crimson">{message}</p> : null}

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard icon={FileText} label="Total briefs" value={totals?.manuscripts ?? 0} />
          <MetricCard icon={Users} label="Registered users" value={totals?.users ?? 0} />
          <MetricCard icon={TrendingUp} label="Today" value={totals?.todayManuscripts ?? 0} />
          <MetricCard icon={Activity} label="Active pipeline" value={(statuses?.new ?? 0) + (statuses?.inReview ?? 0) + (statuses?.contacted ?? 0)} />
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-md border border-navy/10 bg-white p-6 shadow-soft">
            <h2 className="flex items-center gap-2 text-sm font-black uppercase text-navy">
              <BarChart3 size={18} aria-hidden="true" />
              Pipeline status
            </h2>
            <div className="mt-5 grid gap-3">
              <StatusRow label="New" value={statuses?.new ?? 0} tone="bg-crimson" />
              <StatusRow label="In review" value={statuses?.inReview ?? 0} tone="bg-navy" />
              <StatusRow label="Contacted" value={statuses?.contacted ?? 0} tone="bg-steel" />
              <StatusRow label="Closed" value={statuses?.closed ?? 0} tone="bg-darkNavy" />
            </div>
          </div>

          <div className="rounded-md border border-navy/10 bg-white p-6 shadow-soft">
            <h2 className="text-sm font-black uppercase text-navy">Service demand</h2>
            <div className="mt-5 grid gap-3">
              {(overview?.serviceBreakdown ?? []).map((item) => (
                <div key={item.serviceType}>
                  <div className="flex justify-between text-sm font-black text-navy">
                    <span>{item.serviceType}</span>
                    <span>{item.count}</span>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-cream">
                    <div
                      className="h-2 rounded-full bg-crimson"
                      style={{
                        width: `${Math.min(100, item.count * 18)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
              {overview?.serviceBreakdown.length === 0 ? (
                <p className="text-sm font-semibold text-steel">No service data yet.</p>
              ) : null}
            </div>
          </div>
        </section>

        <section className="mt-8 rounded-md border border-navy/10 bg-white p-6 shadow-soft">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-sm font-black uppercase text-navy">Recent manuscript briefs</h2>
            <Link href="/admin/manuscripts" className="text-sm font-black text-crimson hover:text-deepCrimson">
              View all
            </Link>
          </div>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="text-xs font-black uppercase text-steel">
                <tr className="border-b border-navy/10">
                  <th className="py-3">Project</th>
                  <th className="py-3">Author</th>
                  <th className="py-3">Service</th>
                  <th className="py-3">File</th>
                  <th className="py-3">Status</th>
                  <th className="py-3">Submitted</th>
                </tr>
              </thead>
              <tbody>
                {(overview?.recentManuscripts ?? []).map((item) => (
                  <tr key={item.id} className="border-b border-navy/10">
                    <td className="py-4 font-black text-navy">{item.projectTitle}</td>
                    <td className="py-4 text-steel">{item.fullName} {item.lastName}</td>
                    <td className="py-4 text-steel">{item.serviceType}</td>
                    <td className="py-4 text-steel">{item.fileName ? "Uploaded" : "No file"}</td>
                    <td className="py-4">
                      <span className="rounded-md bg-cream px-3 py-2 text-xs font-black uppercase text-navy">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-4 text-steel">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
}) {
  return (
    <article className="rounded-md border border-navy/10 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase text-steel">{label}</p>
          <p className="mt-2 font-serif text-4xl font-black text-navy">{value}</p>
        </div>
        <div className="flex size-12 items-center justify-center rounded-md bg-crimson text-white">
          <Icon size={22} aria-hidden="true" />
        </div>
      </div>
    </article>
  );
}

function StatusRow({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-cream p-4">
      <div className="flex items-center gap-3">
        <span className={`size-3 rounded-full ${tone}`} />
        <span className="font-black text-navy">{label}</span>
      </div>
      <span className="font-serif text-2xl font-black text-crimson">{value}</span>
    </div>
  );
}
