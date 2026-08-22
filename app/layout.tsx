import type { Metadata } from "next";
import "./globals.css";
import { siteMeta } from "@/lib/content";

export const metadata: Metadata = {
  title: siteMeta.title,
  description: siteMeta.description,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-NZ">
      <body className="font-body antialiased bg-white text-ink">{children}</body>
    </html>
  );
}
