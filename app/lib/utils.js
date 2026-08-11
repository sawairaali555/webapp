import { PLATFORMS, QUALITY_META, AUDIO_VARIANTS, SAMPLE_TITLES } from "./constants";

export function detectPlatform(url) {
  if (!url) return null;
  for (const key of Object.keys(PLATFORMS)) {
    if (PLATFORMS[key].match.test(url)) return key;
  }
  return null;
}

export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function buildVariants(platformKey, seed, durationSeconds) {
  const p = PLATFORMS[platformKey];
  const cap = p.caps[seed % p.caps.length];
  const capIndex = p.ladder.indexOf(cap);
  const available = p.ladder.slice(capIndex);
  const minutes = durationSeconds / 60;

  const video = available.map((q) => {
    const meta = QUALITY_META[q];
    const jitter = 0.85 + ((seed + Number(q)) % 30) / 100;
    const sizeMB = Math.max(1, Math.round(meta.rate * minutes * jitter));
    return {
      quality: q,
      label: meta.label,
      tier: meta.tier,
      sizeMB,
      hasAudio: true,
      kind: "video",
    };
  });

  const audio = AUDIO_VARIANTS.map((a) => ({
    quality: a.quality,
    label: a.label,
    tier: a.tier,
    sizeMB: Math.max(1, Math.round(a.rate * minutes * 60 * 0.125)),
    hasAudio: true,
    kind: "audio",
  }));

  return { video, audio };
}

export function formatDuration(s) {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
  return `${m}:${String(sec).padStart(2, "0")}`;
}

export function badgesFor(list) {
  const map = {};
  if (!list.length) return map;
  map[list[0].quality] = "BEST QUALITY";
  map[list[list.length - 1].quality] = "SMALLEST FILE";
  const rec = list.find((v) => v.quality === "1080") || list[0];
  map[rec.quality] = "RECOMMENDED";
  return map;
}

export const downloaderApi = {
  detectPlatform,

  resolve(url) {
    return new Promise((resolve, reject) => {
      const platform = detectPlatform(url);
      setTimeout(() => {
        if (!platform) {
          reject({
            code: "UNSUPPORTED_URL",
            message:
              "That link isn't from a supported platform. Paste a link from YouTube, TikTok, Instagram or Facebook.",
          });
          return;
        }
        const seed = hash(url.trim());
        const pool = SAMPLE_TITLES[platform];
        const [title, author] = pool[seed % pool.length];
        const durationSeconds =
          platform === "tiktok" || platform === "instagram"
            ? 18 + (seed % 45)
            : 140 + (seed % 900);
        const { video, audio } = buildVariants(platform, seed, durationSeconds);

        resolve({
          id: String(seed),
          url,
          platform,
          title,
          author,
          durationSeconds,
          thumbnail: {
            from: ["#1e293b", "#0f172a", "#1e3a8a", "#312e81"][seed % 4],
            to: ["#334155", "#1e293b", "#2563eb", "#4f46e5"][(seed + 1) % 4],
          },
          noWatermark: PLATFORMS[platform].noWatermark,
          formats: PLATFORMS[platform].formats,
          variants: { video, audio },
        });
      }, 900);
    });
  },

  requestDownload(video, variant, format) {
    return new Promise((resolve) => {
      setTimeout(() => resolve({ ok: true, video, variant, format }), 1400);
    });
  },
};
