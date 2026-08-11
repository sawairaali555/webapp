"use client";

import Link from "next/link";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Downloader } from "@/app/components/Downloader";
import { BRAND, PLATFORMS } from "@/app/lib/constants";
import { Icon, PlatformGlyph, icons } from "@/app/components/Icons";

function Hero() {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Download videos from YouTube, TikTok, Instagram & Facebook
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-slate-600 sm:text-lg">
            Paste a link and choose your quality. No sign-up required.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-2xl">
          <Downloader autoFocus />
        </div>
      </div>
    </div>
  );
}

function PlatformCards() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <h2 className="text-center font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
          Choose your platform
        </h2>
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Object.entries(PLATFORMS).map(([key, p]) => (
            <Link
              key={key}
              href={`/${key}`}
              className="flex flex-col items-center rounded-xl border border-slate-200 bg-slate-50 p-6 text-center transition hover:border-blue-600 hover:bg-blue-50"
            >
              <div style={{ color: p.color }}>
                <PlatformGlyph platform={key} className="h-8 w-8" />
              </div>
              <h3 className="mt-3 font-semibold text-slate-900">{p.name}</h3>
              {p.noWatermark && (
                <p className="mt-1 text-xs text-green-600">✓ No watermark</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div id="top" className="min-h-screen bg-white font-body text-slate-900 antialiased">
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
        <Hero />
        <PlatformCards />
      </main>
      <Footer />
    </div>
  );
}
