import type { Metadata } from "next";
import { AppNav } from "@/components/layout/app-nav";

export const metadata: Metadata = {
  title: "ChairHunt",
  description: "Track LA tattoo shops for guest spots, open chairs, and rentals.",
};

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <AppNav />
      <main className="mx-auto max-w-6xl px-4 py-6 md:py-8">{children}</main>
    </div>
  );
}
