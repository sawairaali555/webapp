export const Icon = ({ path, className = "w-5 h-5", stroke = 1.8 }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    {path}
  </svg>
);

export const icons = {
  download: <><path d="M12 3v12" /><path d="m7 11 5 5 5-5" /><path d="M4 21h16" /></>,
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  sparkle: <><path d="m12 3 1.9 5.6L20 10l-5.6 1.9L12 18l-1.9-5.6L4 10l5.6-1.4L12 3Z" /></>,
  lock: <><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 1 1 8 0v3" /></>,
  link: <><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" /></>,
  close: <><path d="M18 6 6 18" /><path d="m6 6 12 12" /></>,
  menu: <><path d="M4 12h16" /><path d="M4 6h16" /><path d="M4 18h16" /></>,
  chevron: <><path d="m6 9 6 6 6-6" /></>,
  check: <path d="m5 13 4 4 10-10" />,
  clipboard: <><path d="M16 4h-3V2h-2v2H9V2H7v2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" /><rect x="4" y="8" width="12" height="2" /></>,
  alert: <><circle cx="12" cy="12" r="9" /><path d="M12 8v5" /><path d="M12 16.5h.01" /></>,
};

export function PlatformGlyph({ platform, className = "w-5 h-5" }) {
  switch (platform) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3L10 15Z" />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M16.5 3h-2.7v11.4a2.6 2.6 0 1 1-2.1-2.6V9a5.5 5.5 0 1 0 4.8 5.5V9.3A6.6 6.6 0 0 0 20 10.4V7.7a3.9 3.9 0 0 1-3.5-4.7Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" className={className} aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5.2" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.5 21v-8h2.7l.4-3.2h-3.1V7.8c0-.9.3-1.5 1.6-1.5h1.6V3.4A22 22 0 0 0 14.4 3c-2.4 0-4 1.5-4 4.2v2.6H7.7V13h2.7v8h3.1Z" />
        </svg>
      );
    default:
      return <Icon path={icons.link} className={className} />;
  }
}
