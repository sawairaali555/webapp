"use client";

import { useState } from "react";
import Link from "next/link";
import { BRAND, NAV } from "@/app/lib/constants";
import { Icon, icons } from "./Icons";

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/25">
            <Icon path={icons.link} className="h-[18px] w-[18px]" stroke={2.2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-slate-900">
            {BRAND}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Downloaders">
          <Link href="/" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">Home</Link>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900">
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a href="#how" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900">How it works</a>
          <a href="#faq" className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition hover:text-slate-900">FAQ</a>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-lg border border-slate-200 p-2 text-slate-900 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25 lg:hidden"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon path={open ? icons.close : icons.menu} />
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto grid w-full max-w-6xl gap-1 px-5 py-3 sm:px-8">
            {[{ label: "Home", href: "/" }, ...NAV, { label: "How it works", href: "#how" }, { label: "FAQ", href: "#faq" }].map((n) => (
              <Link
                key={n.href + n.label}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-900 transition hover:bg-slate-50"
              >
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
