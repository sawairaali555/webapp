"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/app/components/Footer";
import { Header } from "@/app/components/Header";
import { Icon, icons } from "@/app/components/Icons";
import {
  ADMIN_CREDENTIALS,
  ADMIN_SESSION_KEY,
  DEFAULT_SITE_SETTINGS,
  LOGO_ICON_OPTIONS,
  getStoredSiteSettings,
  saveStoredSiteSettings,
  clearStoredSiteSettings,
} from "@/app/lib/siteSettings";

export function AdminPanel() {
  const [settings, setSettings] = useState(DEFAULT_SITE_SETTINGS);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  useEffect(() => {
    const storedSettings = getStoredSiteSettings();
    setSettings(storedSettings);

    const storedSession = window.localStorage.getItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(storedSession === "true");
  }, []);

  const updateSetting = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (
      loginForm.username === ADMIN_CREDENTIALS.username &&
      loginForm.password === ADMIN_CREDENTIALS.password
    ) {
      window.localStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsLoggedIn(true);
      setLoginError("");
      return;
    }

    setLoginError("Invalid username or password.");
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_SESSION_KEY);
    setIsLoggedIn(false);
    setLoginError("");
    setLoginForm({ username: "", password: "" });
  };

  const saveChanges = () => {
    saveStoredSiteSettings(settings);
    setSavedMessage("Site settings saved.");
    setTimeout(() => setSavedMessage(""), 1800);
  };

  const resetChanges = () => {
    clearStoredSiteSettings();
    setSettings(DEFAULT_SITE_SETTINGS);
    setSavedMessage("Settings reset to the default brand content.");
    setTimeout(() => setSavedMessage(""), 1800);
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />

        <main className="mx-auto flex w-full max-w-4xl items-center justify-center px-5 py-16 sm:px-8">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="mb-6">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Admin access</p>
              <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900">
                Sign in to edit content
              </h1>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Username</label>
                <input
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((current) => ({ ...current, username: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                  placeholder="admin"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((current) => ({ ...current, password: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                  placeholder="admin123"
                />
              </div>

              {loginError && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Log in
              </button>
            </form>

            <div className="mt-5 rounded-xl bg-slate-100 p-3 text-xs text-slate-600">
              Demo credentials: <span className="font-semibold">admin</span> / <span className="font-semibold">admin123</span>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-600">Admin panel</p>
            <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Edit brand, text, logo and icons
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleLogout}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Log out
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Back to home
            </Link>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <section className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-semibold text-slate-900">Branding</h2>
                  <p className="mt-1 text-sm text-slate-500">Update the name, accent color, logo and visible labels.</p>
                </div>
                <button
                  onClick={saveChanges}
                  className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                  Save changes
                </button>
              </div>

              {savedMessage && (
                <div className="mb-4 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">
                  {savedMessage}
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Brand name</label>
                  <input
                    value={settings.brand}
                    onChange={(e) => updateSetting("brand", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Accent color</label>
                  <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                    <input
                      type="color"
                      value={settings.accentColor}
                      onChange={(e) => updateSetting("accentColor", e.target.value)}
                      className="h-10 w-12 rounded border-0 bg-transparent"
                    />
                    <span className="text-sm text-slate-600">{settings.accentColor}</span>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Logo icon</label>
                  <select
                    value={settings.logoIcon}
                    onChange={(e) => updateSetting("logoIcon", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                  >
                    {LOGO_ICON_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-xl font-semibold text-slate-900">Homepage content</h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Homepage title</label>
                  <input
                    value={settings.homepageTitle}
                    onChange={(e) => updateSetting("homepageTitle", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Homepage subtitle</label>
                  <textarea
                    value={settings.homepageSubtitle}
                    onChange={(e) => updateSetting("homepageSubtitle", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
              <h2 className="font-display text-xl font-semibold text-slate-900">Footer content</h2>
              <div className="mt-4 grid gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Footer blurb</label>
                  <textarea
                    value={settings.footerBlurb}
                    onChange={(e) => updateSetting("footerBlurb", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Footer notice</label>
                  <textarea
                    value={settings.footerNotice}
                    onChange={(e) => updateSetting("footerNotice", e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-blue-600"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="font-display text-xl font-semibold text-slate-900">Live preview</h2>
            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-3">
                <span
                  className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                  style={{ backgroundColor: settings.accentColor }}
                >
                  <Icon path={icons[settings.logoIcon] ?? icons.link} className="h-5 w-5" stroke={2.2} />
                </span>
                <span className="font-display text-xl font-semibold text-slate-900">{settings.brand}</span>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-display text-lg font-semibold text-slate-900">{settings.homepageTitle}</h3>
                <p className="mt-2 text-sm text-slate-600">{settings.homepageSubtitle}</p>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                <p>{settings.footerBlurb}</p>
                <p className="mt-2 text-xs text-slate-500">{settings.footerNotice}</p>
              </div>
            </div>

            <button
              onClick={resetChanges}
              className="mt-5 w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-100"
            >
              Reset to default content
            </button>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
