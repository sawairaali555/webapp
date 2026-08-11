export const metadata = {
  title: "Grabline",
  description: "Download videos from YouTube, TikTok, Instagram and Facebook.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
