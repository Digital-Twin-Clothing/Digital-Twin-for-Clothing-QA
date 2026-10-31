import { getCurrentUser } from "@/lib/auth-helpers";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-4xl px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-mute hover:text-ink transition-colors mb-8"
          >
            ← Back to home
          </Link>
          <h1 className="text-4xl font-serif text-ink mb-3">Dashboard</h1>
          <p className="text-mute">
            Welcome back, {user.name}!
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-card border border-line rounded-2xl p-8 mb-8">
          <h2 className="text-xl font-serif text-ink mb-4">Your Profile</h2>
          <div className="space-y-3">
            <div className="flex justify-between py-3 border-b border-line">
              <span className="text-mute">Name</span>
              <span className="text-ink font-medium">{user.name}</span>
            </div>
            <div className="flex justify-between py-3 border-b border-line">
              <span className="text-mute">Email</span>
              <span className="text-ink font-medium">{user.email}</span>
            </div>
            <div className="flex justify-between py-3">
              <span className="text-mute">User ID</span>
              <span className="text-ink font-mono text-sm">{user.id}</span>
            </div>
          </div>
        </div>

        {/* Protected Content Example */}
        <div className="bg-card border border-line rounded-2xl p-8">
          <h2 className="text-xl font-serif text-ink mb-4">Protected Content</h2>
          <p className="text-mute mb-6">
            This page is protected by authentication middleware. Only authenticated
            users can see this content.
          </p>
          <div className="bg-bg border border-line rounded-lg p-4">
            <p className="text-sm text-ink">
              Try signing out and accessing <code className="font-mono bg-line px-2 py-1 rounded">/dashboard</code> directly.
              You'll be redirected to the login page automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
