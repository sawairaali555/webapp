import PlatformPage from "@/app/components/PlatformPage";

export const metadata = {
  title: "YouTube Video Downloader - Grabline",
  description: "Download YouTube videos in 1080p, 1440p and 4K resolutions.",
};

export default function YouTubePage() {
  return <PlatformPage platformKey="youtube" />;
}
