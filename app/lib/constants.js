export const BRAND = "Grabline";

export const PLATFORMS = {
  youtube: {
    name: "YouTube",
    color: "#FF0000",
    match: /(?:youtube\.com\/(?:watch|shorts|live|embed)|youtu\.be\/)/i,
    ladder: ["2160", "1440", "1080", "720", "480", "360"],
    caps: ["2160", "1440", "1080", "720"],
    noWatermark: false,
    formats: ["MP4", "WEBM", "MP3"],
  },
  tiktok: {
    name: "TikTok",
    color: "#000000",
    match: /(?:tiktok\.com|vm\.tiktok\.com)/i,
    ladder: ["1080", "720", "480"],
    caps: ["1080", "720"],
    noWatermark: true,
    formats: ["MP4", "MP3"],
  },
  instagram: {
    name: "Instagram",
    color: "#C13584",
    match: /instagram\.com\/(?:p|reel|reels|tv)/i,
    ladder: ["1080", "720", "480"],
    caps: ["1080", "720"],
    noWatermark: true,
    formats: ["MP4", "MP3"],
  },
  facebook: {
    name: "Facebook",
    color: "#1877F2",
    match: /(?:facebook\.com\/(?:watch|reel|share|[^/]+\/videos)|fb\.watch)/i,
    ladder: ["1080", "720", "480", "360"],
    caps: ["1080", "720", "480"],
    noWatermark: true,
    formats: ["MP4", "MP3"],
  },
};

export const QUALITY_META = {
  "2160": { label: "4K", tier: "Maximum quality", rate: 22.0 },
  "1440": { label: "1440p", tier: "Very high quality", rate: 13.5 },
  "1080": { label: "1080p", tier: "Full HD", rate: 8.0 },
  "720": { label: "720p", tier: "HD", rate: 4.4 },
  "480": { label: "480p", tier: "Standard", rate: 2.7 },
  "360": { label: "360p", tier: "Small file", rate: 1.7 },
  "240": { label: "240p", tier: "Data saver", rate: 1.0 },
};

export const AUDIO_VARIANTS = [
  { quality: "320", label: "320 kbps", tier: "Studio", rate: 0.32 },
  { quality: "192", label: "192 kbps", tier: "High", rate: 0.192 },
  { quality: "128", label: "128 kbps", tier: "Standard", rate: 0.128 },
];

export const SAMPLE_TITLES = {
  youtube: [
    ["Building a design system from scratch — full walkthrough", "Layercraft"],
    ["Why your morning routine isn't working", "The Quiet Hour"],
    ["Iceland in winter: 8 days, one camera", "Field Notes"],
  ],
  tiktok: [
    ["one-pan lemon butter salmon 🍋", "@weeknightkitchen"],
    ["POV: the desk setup finally clicked", "@deskloop"],
    ["3 stretches for people who sit all day", "@movewithana"],
  ],
  instagram: [
    ["Studio tour — everything on the shelf", "@makers.daily"],
    ["Sunrise at the harbour, no filter", "@coastal.frames"],
    ["30-second pasta trick", "@smallplates"],
  ],
  facebook: [
    ["Community clean-up — thank you to all 200 volunteers", "Riverside Neighbours"],
    ["Highlights from Saturday's market", "Old Town Market"],
    ["Full talk: rethinking public transit", "City Forum"],
  ],
};

export const PLATFORM_COPY = {
  youtube: {
    heading: "YouTube video downloader — 1080p, 1440p and 4K",
    body: "Paste any YouTube watch, Shorts or live-replay link. Grabline reads the source and lists only the resolutions that video was uploaded in, so you never pick a 4K option that doesn't exist. Audio-only MP3 is available on the same screen.",
    qualities: ["4K", "1440p", "1080p", "720p", "480p", "360p"],
    steps: [
      "Open the video and copy the link from the address bar or Share menu",
      "Paste it above",
      "Pick a resolution and save the file",
    ],
    sample: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  tiktok: {
    heading: "TikTok downloader — no watermark",
    body: "TikTok links resolve to the clean source file without the overlay watermark, at the resolution the creator uploaded. Most TikToks top out at 1080p — you'll see exactly what's there, plus an MP3 option if you only want the sound.",
    qualities: ["1080p", "720p", "480p", "MP3"],
    steps: [
      "Tap Share, then Copy link",
      "Paste it above",
      "Choose the no-watermark file and save",
    ],
    sample: "https://www.tiktok.com/@user/video/7300000000000000000",
  },
  instagram: {
    heading: "Instagram downloader for Reels, posts and IGTV",
    body: "Works with Reels, video posts and IGTV on public accounts. Files come through without the platform watermark, at the original upload quality — usually 1080p for Reels shot on a recent phone.",
    qualities: ["1080p", "720p", "480p", "MP3"],
    steps: [
      "Tap the ••• menu on the post, then Copy link",
      "Paste it above",
      "Pick a quality and save",
    ],
    sample: "https://www.instagram.com/reel/Cx1234abcd/",
  },
  facebook: {
    heading: "Facebook video downloader — HD and SD",
    body: "Handles Watch videos, Reels and page posts that are set to public. Grabline pulls the HD stream where Facebook has one and falls back to SD where it doesn't, with no watermark added by us.",
    qualities: ["1080p", "720p", "480p", "360p"],
    steps: [
      "Open the video, then copy the post link",
      "Paste it above",
      "Choose HD or SD and save",
    ],
    sample: "https://www.facebook.com/watch?v=1234567890",
  },
};

export const NAV = [
  { label: "YouTube", href: "/youtube" },
  { label: "TikTok", href: "/tiktok" },
  { label: "Instagram", href: "/instagram" },
  { label: "Facebook", href: "/facebook" },
];

export const FEATURES = [
  {
    title: "One field, the right file",
    body: "Paste the link, pick a row. No pop-ups, no sign-up, no waiting for email.",
    icon: "download",
  },
  {
    title: "The quality that's actually there",
    body: "Grabline shows only the resolutions the upload really has. No fake 4K if the original was 1080.",
    icon: "sparkle",
  },
  {
    title: "No watermark",
    body: "TikTok, Instagram and Facebook videos come through clean. YouTube doesn't add one anyway.",
    icon: "lock",
  },
];

export const STEPS = [
  {
    n: "01",
    title: "Copy the video link",
    body: "Use Share → Copy link in the app, or copy it straight from your browser's address bar.",
  },
  {
    n: "02",
    title: "Paste it into the field",
    body: "Grabline works out which platform it came from and reads what the video has available.",
  },
  {
    n: "03",
    title: "Choose a quality and save",
    body: "Pick a row from the list. The recommended badge marks the best balance of sharpness and size.",
  },
];

export const FAQS = [
  {
    q: "Which platforms are supported?",
    a: "YouTube, TikTok, Instagram and Facebook. That covers watch pages, Shorts and Reels, video posts and public page videos. Private or restricted content can't be read.",
  },
  {
    q: "Can I download videos in 4K?",
    a: "Yes, when the video was uploaded in 4K. That's mostly YouTube. If a 2160p stream exists, it appears at the top of the list with a Best quality badge.",
  },
  {
    q: "Why isn't 4K available for some videos?",
    a: "Because it was never there. A video can only be downloaded at the resolutions it was uploaded and encoded in — nothing can add detail that wasn't recorded. If the creator uploaded 1080p, 1080p is the ceiling, and the list stops there.",
  },
];

export const QUALITY_CARDS = [
  {
    label: "4K",
    tier: "Maximum quality",
    note: "Largest file. Worth it on a big screen or for editing.",
    weight: 100,
  },
  {
    label: "1440p",
    tier: "Very high quality",
    note: "Sharper than Full HD without going all the way up.",
    weight: 62,
  },
  {
    label: "1080p",
    tier: "Full HD",
    note: "The best balance of sharpness and file size.",
    weight: 38,
    highlight: true,
  },
  {
    label: "720p",
    tier: "HD",
    note: "Looks clean on phones and uses less data.",
    weight: 22,
  },
  {
    label: "480p",
    tier: "Standard",
    note: "Fine for talking-head clips and slow connections.",
    weight: 13,
  },
  {
    label: "360p",
    tier: "Small file",
    note: "Smallest video option. Save it when storage is tight.",
    weight: 8,
  },
];
