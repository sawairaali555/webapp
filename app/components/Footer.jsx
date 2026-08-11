import { BRAND, PLATFORMS } from "@/app/lib/constants";
import { Icon, PlatformGlyph, icons } from "./Icons";

const FOOTER_COLS = [
  {
    title: "Download",
    links: [
      { label: "YouTube", href: "/youtube" },
      { label: "TikTok", href: "/tiktok" },
      { label: "Instagram", href: "/instagram" },
      { label: "Facebook", href: "/facebook" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "How it works", href: "#how" },
      { label: "FAQ", href: "#faq" },
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  const cols = FOOTER_COLS;
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[1.2fr_repeat(2,1fr)]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Icon path={icons.download} className="h-[18px] w-[18px]" stroke={2.2} />
              </span>
              <span className="font-display text-lg font-semibold tracking-tight text-slate-900">{BRAND}</span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-slate-500">
              A quiet, fast way to save a video at the quality you choose. No account, no
              pop-ups, no fake buttons.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {Object.entries(PLATFORMS).map(([key, p]) => (
                <span key={key} className="text-slate-500 transition hover:text-slate-900" style={{ color: undefined }} title={p.name}>
                  <PlatformGlyph platform={key} className="h-4 w-4" />
                </span>
              ))}
            </div>
          </div>

          {cols.map((c) => (
            <div key={c.title}>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-slate-500">{c.title}</p>
              <ul className="mt-3 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-slate-500 transition hover:text-slate-900">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">© 2026 {BRAND}. All rights reserved.</p>
          <p className="text-xs text-slate-500">
            Not affiliated with YouTube, TikTok, Instagram or Facebook.
          </p>
        </div>
      </div>
    </footer>
  );
}
