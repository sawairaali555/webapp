"use client";

import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Downloader } from "@/app/components/Downloader";
import { BRAND, PLATFORMS, PLATFORM_COPY } from "@/app/lib/constants";
import { Icon, PlatformGlyph, icons } from "@/app/components/Icons";

function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`scroll-mt-20 ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">{children}</div>
    </section>
  );
}

export default function PlatformPage({ platformKey }) {
  const p = PLATFORMS[platformKey];
  const copy = PLATFORM_COPY[platformKey];

  if (!p || !copy) {
    return (
      <div className="min-h-screen bg-white font-body text-slate-900 antialiased">
        <Header />
        <main className="py-20 text-center">
          <p className="text-slate-500">Platform not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-body text-slate-900 antialiased">
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@500;700&display=swap');
          .font-display { font-family: 'Bricolage Grotesque', 'Inter', ui-sans-serif, system-ui, sans-serif; }
          .font-body { font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, sans-serif; }
          .font-mono { font-family: 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace; }
          html { scroll-behavior: smooth; }
          @media (prefers-reduced-motion: reduce) {
            html { scroll-behavior: auto; }
            *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
          }
        `,
        }}
      />
      <Header />
      <main>
        <Section className="py-16 sm:py-20">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-9">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
              <div>
                <div className="flex items-center gap-2">
                  <span style={{ color: p.color }}>
                    <PlatformGlyph platform={platformKey} className="h-6 w-6" />
                  </span>
                  <h1 className="font-display text-2xl font-semibold text-slate-900 sm:text-3xl">
                    {p.name}
                  </h1>
                </div>

                <p className="mt-3 text-slate-600">{copy.body}</p>

                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-900">How to download:</p>
                  <ol className="mt-3 space-y-2">
                    {copy.steps.map((step, i) => (
                      <li key={i} className="flex gap-2 text-sm text-slate-600">
                        <span className="font-semibold text-slate-900">{i + 1}.</span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>

              <div>
                <p className="mb-3 text-sm font-semibold text-slate-900">Paste your link:</p>
                <Downloader placeholder={`Paste ${p.name} link here`} autoFocus />
              </div>
            </div>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
