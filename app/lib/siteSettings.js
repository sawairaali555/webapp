import { FAQS, FEATURES, STEPS } from "@/app/lib/constants";

export const SITE_SETTINGS_KEY = "grabline-site-settings";
export const ADMIN_SESSION_KEY = "grabline-admin-session";

export const DEFAULT_SITE_SETTINGS = {
  brand: "Grabline",
  accentColor: "#2563eb",
  logoIcon: "link",
  homepageTitle: "Download videos from YouTube, TikTok, Instagram & Facebook",
  homepageSubtitle: "Paste a link and choose your quality. No sign-up required.",
  footerBlurb:
    "A quiet, fast way to save a video at the quality you choose. No account, no pop-ups, no fake buttons.",
  footerNotice: "Not affiliated with YouTube, TikTok, Instagram or Facebook.",
  features: FEATURES,
  steps: STEPS,
  faqs: FAQS,
};

export const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "admin123",
};

export const LOGO_ICON_OPTIONS = [
  { value: "download", label: "Download" },
  { value: "link", label: "Link" },
  { value: "sparkle", label: "Sparkle" },
  { value: "lock", label: "Lock" },
  { value: "bolt", label: "Bolt" },
];

export function mergeSiteSettings(overrides = {}) {
  return {
    ...DEFAULT_SITE_SETTINGS,
    ...overrides,
    features: overrides.features ?? DEFAULT_SITE_SETTINGS.features,
    steps: overrides.steps ?? DEFAULT_SITE_SETTINGS.steps,
    faqs: overrides.faqs ?? DEFAULT_SITE_SETTINGS.faqs,
  };
}

export function getStoredSiteSettings() {
  if (typeof window === "undefined") {
    return DEFAULT_SITE_SETTINGS;
  }

  try {
    const stored = window.localStorage.getItem(SITE_SETTINGS_KEY);
    return stored ? mergeSiteSettings(JSON.parse(stored)) : DEFAULT_SITE_SETTINGS;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

export function saveStoredSiteSettings(settings) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(SITE_SETTINGS_KEY, JSON.stringify(mergeSiteSettings(settings)));
}

export function clearStoredSiteSettings() {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.removeItem(SITE_SETTINGS_KEY);
}
