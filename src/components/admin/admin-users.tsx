"use client";

import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { getAdminUsers, updateAdminUserStatus } from "@/lib/api";
import type { AdminUser } from "@/lib/types";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "../ui/button";

export function AdminUsers() {
  const router = useRouter();
  const token = useAuthStore((state) => state.accessToken);
  const user = useAuthStore((state) => state.user);
  const hasHydrated = useAuthStore((state) => state.hasHydrated);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [message, setMessage] = useState("");
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!hasHydrated) return;

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
        const result = await getAdminUsers(token);
        setUsers(result.data);
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to load users.");
      }
    });
  }, [hasHydrated, router, token, user?.role]);

  const toggleUser = (targetUser: AdminUser) => {
    if (!token) return;

    startTransition(async () => {
      try {
        const result = await updateAdminUserStatus(token, targetUser.id, !targetUser.isActive);
        setUsers((current) =>
          current.map((item) => (item.id === targetUser.id ? result.data : item))
        );
      } catch (error) {
        setMessage(error instanceof Error ? error.message : "Unable to update user.");
      }
    });
  };

  return (
    <main className="min-h-screen bg-cream">
      <div className="section-shell py-8">
        <Link href="/admin" className="text-sm font-black uppercase text-crimson">
          Back to overview
        </Link>
        <h1 className="mt-4 font-serif text-5xl font-black text-navy">User management</h1>
        <p className="mt-4 max-w-2xl text-base leading-7 text-steel">
          Review platform accounts and activate or deactivate customer access.
        </p>
        {isPending ? <p className="mt-6 font-bold text-steel">Loading users...</p> : null}
        {message ? <p className="mt-6 font-bold text-crimson">{message}</p> : null}

        <div className="mt-8 overflow-x-auto rounded-md border border-navy/10 bg-white shadow-soft">
          <table className="w-full min-w-[860px] border-collapse text-left text-sm">
            <thead className="text-xs font-black uppercase text-steel">
              <tr className="border-b border-navy/10">
                <th className="px-5 py-4">Name</th>
                <th className="px-5 py-4">Email</th>
                <th className="px-5 py-4">Phone</th>
                <th className="px-5 py-4">Role</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Joined</th>
                <th className="px-5 py-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id} className="border-b border-navy/10">
                  <td className="px-5 py-4 font-black text-navy">{item.fullName}</td>
                  <td className="px-5 py-4 text-steel">{item.email}</td>
                  <td className="px-5 py-4 text-steel">{item.phoneNumber}</td>
                  <td className="px-5 py-4 text-steel">{item.role}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-md bg-cream px-3 py-2 text-xs font-black uppercase text-navy">
                      {item.isActive ? "Active" : "Disabled"}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-steel">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-5 py-4">
                    <Button
                      type="button"
                      variant={item.isActive ? "ghost" : "secondary"}
                      onClick={() => toggleUser(item)}
                      disabled={item.id === user?.id}
                    >
                      {item.isActive ? "Disable" : "Activate"}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
