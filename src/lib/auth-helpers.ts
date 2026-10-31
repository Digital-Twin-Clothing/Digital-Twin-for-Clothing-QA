import { auth } from "@/lib/auth";

/**
 * Server-side helper to get the current session
 * Use this in Server Components, Server Actions, and Route Handlers
 */
export async function getSession() {
  return await auth();
}

/**
 * Server-side helper to get the current user
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user ?? null;
}

/**
 * Server-side helper to check if user is authenticated
 */
export async function isAuthenticated() {
  const session = await getSession();
  return !!session?.user;
}
