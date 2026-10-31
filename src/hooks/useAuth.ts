"use client";

import { useSession } from "next-auth/react";

/**
 * Client-side hook to access authentication state
 * Use this in Client Components
 */
export function useAuth() {
  const { data: session, status } = useSession();

  return {
    user: session?.user ?? null,
    session,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
  };
}
