"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Header } from "@/app/components/Header";
import { Footer } from "@/app/components/Footer";
import { Downloader } from "@/app/components/Downloader";
import { PLATFORMS } from "@/app/lib/constants";
import { DEFAULT_SITE_SETTINGS, getStoredSiteSettings } from "@/app/lib/siteSettings";
import { PlatformGlyph } from "@/app/components/Icons";

function Hero({ settings }) {
  return (
    <div className="border-b border-slate-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            {settings.homepageTitle}
          </h1>

          <p className="mx-auto mt-4 max-w-md text-base text-slate-600 sm:text-lg">
            {settings.homepageSubtitle}
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

function FeatureGrid({ features }) {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">Why it feels easy</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Everything you need, in one place
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={`${feature.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div
                className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white"
                style={{ backgroundColor: "#2563eb" }}
              >
                <span className="text-lg">{feature.icon === "download" ? "↓" : feature.icon === "sparkle" ? "✦" : feature.icon === "lock" ? "🔒" : feature.icon === "bolt" ? "⚡" : "→"}</span>
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks({ steps }) {
  return (
    <section id="how" className="scroll-mt-24 bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">How it works</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Three quick steps to your file
          </h2>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-700">
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="font-display text-xl font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection({ faqs }) {
  return (
    <section id="faq" className="scroll-mt-24 bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-blue-600">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Common questions
          </h2>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((item, index) => (
            <div key={`${item.q}-${index}`} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h3 className="font-display text-lg font-semibold text-slate-900">{item.q}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);

  useEffect(() => {
    setSettings(getStoredSiteSettings());
  }, []);

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
        <Hero settings={settings} />
        <PlatformCards />
        <FeatureGrid features={settings.features ?? []} />
        <HowItWorks steps={settings.steps ?? []} />
        <FAQSection faqs={settings.faqs ?? []} />
      </main>
      <Footer />
    </div>
  );
}
