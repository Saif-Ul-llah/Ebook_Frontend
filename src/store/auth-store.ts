"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AuthTokens, AuthUser } from "@/lib/types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  hasHydrated: boolean;
  setTokens: (tokens: AuthTokens) => void;
  logout: () => void;
  setHasHydrated: (hasHydrated: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      hasHydrated: false,
      setTokens: (tokens) =>
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
          user: tokens.user ?? null,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          accessToken: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
        }),
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
    }),
    {
      name: "noble-ink-auth",
      partialize: (state) => ({
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
