import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Digital Twins — Virtual fitting room",
  description:
    "Create a 3D avatar from four photos and try on garments with fit assessment and size prediction.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  return (
    <html lang="en">
      <head>
        {/* Fonts are loaded from Google Fonts at runtime; the CSS falls back
            to Georgia / system-ui if you are offline. */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600&display=swap"
        />
      </head>
      <body>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
