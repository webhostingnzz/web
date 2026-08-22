"use client";
import { useState } from "react";
import { nav } from "@/lib/content";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-3">
      <div className="max-w-6xl mx-auto bg-white/95 backdrop-blur border border-black/5 rounded-2xl shadow-sm px-5 py-2.5 flex items-center justify-between">
        <a href="/" className="font-display font-extrabold text-lg" aria-label="Webhosting NZ home">
          Webhosting<span className="text-aqua">.nz</span>
        </a>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="px-3 py-2 rounded-lg text-[13px] font-bold tracking-wide text-ink/90 hover:bg-aqua/10 hover:text-aqua transition-colors"
            >
              {l.label.toUpperCase()}
              {l.badge && (
                <span className="ml-1.5 align-middle bg-red-500 text-white text-[9px] font-extrabold px-1.5 py-0.5 rounded">
                  {l.badge.toUpperCase()}
                </span>
              )}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a
            href={nav.clientAreaHref}
            className="hidden sm:inline-flex bg-aqua text-white text-[13px] font-bold px-4 py-2 rounded-lg shadow-[0_4px_14px_rgba(12,192,223,0.3)] hover:-translate-y-0.5 transition-transform"
          >
            {nav.clientAreaLabel.toUpperCase()}
          </a>
          <button
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-lg border border-black/10"
          >
            <span className="sr-only">Menu</span>
            <div className="w-4 h-3 relative">
              <span className={`absolute left-0 top-0 w-4 h-0.5 bg-ink transition-transform ${open ? "rotate-45 top-1.5" : ""}`} />
              <span className={`absolute left-0 bottom-0 w-4 h-0.5 bg-ink transition-transform ${open ? "-rotate-45 bottom-1.5" : ""}`} />
            </div>
          </button>
        </div>
      </div>
      {open && (
        <div className="max-w-6xl mx-auto mt-2 bg-white border border-black/5 rounded-2xl shadow-lg overflow-hidden lg:hidden">
          {nav.links.map((l) => (
            <a key={l.label} href={l.href} className="block px-5 py-3.5 text-[13px] font-bold border-t first:border-t-0 border-black/5">
              {l.label.toUpperCase()}
            </a>
          ))}
          <a href={nav.clientAreaHref} className="block px-5 py-3.5 text-[13px] font-bold border-t border-black/5 text-aqua">
            {nav.clientAreaLabel.toUpperCase()}
          </a>
        </div>
      )}
    </header>
  );
}
