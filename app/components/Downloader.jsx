"use client";

import { useState, useCallback, useEffect } from "react";
import { Icon, icons, PlatformGlyph } from "./Icons";
import { downloaderApi, detectPlatform } from "@/app/lib/utils";

function DownloadButton({ children, onClick, variant = "primary", size = "md", type = "button", disabled, className = "", ...rest }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-150 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25 disabled:opacity-60 disabled:cursor-not-allowed";
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-3 text-sm",
    lg: "px-7 py-4 text-base",
  };
  const variants = {
    primary: "bg-blue-600 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 active:translate-y-px active:shadow-md",
    ghost: "bg-white text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50 active:translate-y-px",
    quiet: "bg-slate-100 text-slate-900 hover:bg-slate-200 active:translate-y-px",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

function UrlInput({ value, onChange, onSubmit, loading, autoFocus, compact, placeholder }) {
  const detected = detectPlatform(value);
  
  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      onChange(text);
    } catch (err) {
      console.error("Failed to read clipboard:", err);
    }
  };

  return (
    <div>
      <div
        className={`flex flex-col gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/[0.06] transition focus-within:border-blue-600 focus-within:shadow-blue-600/10 sm:flex-row sm:items-center ${
          compact ? "" : "sm:p-2.5"
        }`}
      >
        <div className="flex flex-1 items-center gap-3 px-3">
          <span className={`shrink-0 transition-colors ${detected ? "text-blue-600" : "text-slate-500"}`}>
            {detected ? <PlatformGlyph platform={detected} /> : <Icon path={icons.link} />}
          </span>
          <input
            value={value}
            autoFocus={autoFocus}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSubmit()}
            placeholder={placeholder || "Paste video URL here..."}
            aria-label="Video URL"
            inputMode="url"
            className={`w-full bg-transparent text-slate-900 placeholder-slate-500 outline-none ${
              compact ? "py-2.5 text-sm" : "py-3 text-base"
            }`}
          />
        </div>
        <div className="flex gap-2 px-2 sm:px-0">
          <button
            onClick={handlePaste}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 transition hover:bg-slate-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25"
            aria-label="Paste from clipboard"
          >
            <Icon path={icons.clipboard} className="h-4 w-4" />
            Paste
          </button>
          <DownloadButton
            onClick={onSubmit}
            size={compact ? "md" : "lg"}
            disabled={loading || !value.trim()}
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Reading link
              </>
            ) : (
              <>
                <Icon path={icons.download} className="h-[18px] w-[18px]" stroke={2.2} />
                Download
              </>
            )}
          </DownloadButton>
        </div>
      </div>
    </div>
  );
}

function ResultSkeleton() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06] sm:p-6">
      <div className="flex animate-pulse flex-col gap-4 sm:flex-row">
        <div className="aspect-video w-full rounded-xl bg-slate-100 sm:w-48" />
        <div className="flex-1 space-y-3 py-1">
          <div className="h-5 w-24 rounded-full bg-slate-100" />
          <div className="h-5 w-3/4 rounded bg-slate-100" />
          <div className="h-4 w-1/3 rounded bg-slate-100" />
        </div>
      </div>
      <div className="mt-6 space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-50" />
        ))}
      </div>
    </div>
  );
}

function ErrorState({ message, onRetry }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06]">
      <div className="flex gap-3">
        <span className="mt-0.5 shrink-0 text-slate-900"><Icon path={icons.alert} /></span>
        <div>
          <p className="font-semibold text-slate-900">Link not recognised</p>
          <p className="mt-1 text-sm text-slate-500">{message}</p>
          <button
            onClick={onRetry}
            className="mt-3 text-sm font-semibold text-blue-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25 rounded"
          >
            Try another link
          </button>
        </div>
      </div>
    </div>
  );
}

function FormatSelector({ formats, value, onChange }) {
  return (
    <div className="inline-flex rounded-xl bg-slate-100 p-1" role="tablist" aria-label="File format">
      {formats.map((f) => {
        const active = f === value;
        return (
          <button
            key={f}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(f)}
            className={`rounded-lg px-3.5 py-1.5 font-mono text-xs font-semibold tracking-wide transition focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25 ${
              active ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            {f}
          </button>
        );
      })}
    </div>
  );
}

function downloadBlob(content, filename, mime = "application/octet-stream") {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function buildDownloadFilename(video, variant, format) {
  const safeTitle = video.title.replace(/[^a-zA-Z0-9-_ ]/g, "").trim().replace(/\s+/g, "-");
  const extension = format.toLowerCase();
  return `${safeTitle}-${variant.quality}p.${extension}`;
}

function formatMimeType(format) {
  if (format === "MP3") return "audio/mpeg";
  if (format === "WEBM") return "video/webm";
  return "video/mp4";
}

function QualityRow({ variant, badge, maxSize, format, onDownload, state }) {
  const pct = Math.max(6, Math.round((variant.sizeMB / maxSize) * 100));
  const recommended = badge === "RECOMMENDED";

  const badgeStyles = {
    "BEST QUALITY": "bg-slate-900 text-white",
    RECOMMENDED: "bg-blue-600 text-white",
    "SMALLEST FILE": "bg-slate-100 text-slate-500",
  };

  return (
    <div
      className={`relative grid grid-cols-[1fr_auto] items-center gap-3 rounded-xl border p-3 transition sm:grid-cols-[minmax(0,1.05fr)_minmax(0,1.15fr)_auto] sm:gap-4 sm:p-3.5 ${
        recommended
          ? "border-blue-600 bg-blue-50/40 ring-1 ring-blue-600/20"
          : "border-slate-200 bg-white hover:border-slate-300"
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-mono text-base font-bold tracking-tight text-slate-900">{variant.label}</span>
          {badge && (
            <span className={`rounded-md px-1.5 py-0.5 font-mono text-[10px] font-bold tracking-wider ${badgeStyles[badge]}`}>
              {badge}
            </span>
          )}
        </div>
        <p className="mt-0.5 truncate text-xs text-slate-500">
          {variant.tier} · {format}
        </p>
      </div>

      <div className="col-span-2 sm:col-span-1 sm:col-start-2">
        <div className="flex items-center gap-3">
          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
            <div
              className={`h-full rounded-full transition-all duration-500 ${recommended ? "bg-blue-600" : "bg-slate-300"}`}
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="w-16 shrink-0 text-right font-mono text-xs font-medium text-slate-500">
            {variant.sizeMB} MB
          </span>
        </div>
      </div>

      <div className="row-start-1 col-start-2 sm:col-start-3 sm:row-start-auto">
        {state === "done" ? (
          <span className="inline-flex items-center gap-1.5 rounded-xl bg-green-50 px-4 py-2 text-sm font-semibold text-green-600">
            <Icon path={icons.check} className="h-4 w-4" stroke={2.5} />
            Saved
          </span>
        ) : (
          <DownloadButton
            size="sm"
            variant={recommended ? "primary" : "ghost"}
            disabled={state === "working"}
            onClick={onDownload}
            aria-label={`Download ${variant.label} ${format}, ${variant.sizeMB} megabytes`}
          >
            {state === "working" ? (
              <>
                <span className={`h-3.5 w-3.5 animate-spin rounded-full border-2 ${recommended ? "border-white/40 border-t-white" : "border-slate-200 border-t-slate-900"}`} />
                Saving
              </>
            ) : (
              <>
                <Icon path={icons.download} className="h-4 w-4" stroke={2.2} />
                Download
              </>
            )}
          </DownloadButton>
        )}
      </div>
    </div>
  );
}

function badgesFor(list) {
  const map = {};
  if (!list.length) return map;
  map[list[0].quality] = "BEST QUALITY";
  map[list[list.length - 1].quality] = "SMALLEST FILE";
  const rec = list.find((v) => v.quality === "1080") || list[0];
  map[rec.quality] = "RECOMMENDED";
  return map;
}

function QualitySelector({ video, format, onFormatChange }) {
  const [states, setStates] = useState({});
  const isAudio = format === "MP3";
  const list = isAudio ? video.variants.audio : video.variants.video;
  const badges = badgesFor(list);
  const maxSize = Math.max(...list.map((v) => v.sizeMB));

  const run = async (variant) => {
    const key = `${format}-${variant.quality}`;
    setStates((s) => ({ ...s, [key]: "working" }));
    await downloaderApi.requestDownload(video, variant, format);

    const filename = buildDownloadFilename(video, variant, format);
    const mimeType = formatMimeType(format);
    const content = `Downloaded from ${video.url}\nTitle: ${video.title}\nAuthor: ${video.author}\nQuality: ${variant.label} ${format}\nSize: ${variant.sizeMB} MB\n`;
    downloadBlob(content, filename, mimeType);

    setStates((s) => ({ ...s, [key]: "done" }));
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="font-display text-base font-semibold tracking-tight text-slate-900">
            Available downloads
          </h4>
          <p className="mt-0.5 text-xs text-slate-500">
            {isAudio
              ? "Audio extracted from the source video."
              : `${list.length} ${list.length === 1 ? "quality" : "qualities"} found for this video. Bars show relative file size.`}
          </p>
        </div>
        <FormatSelector formats={video.formats} value={format} onChange={onFormatChange} />
      </div>

      <div className="space-y-2">
        {list.map((v) => (
          <QualityRow
            key={v.quality}
            variant={v}
            badge={badges[v.quality]}
            maxSize={maxSize}
            format={format}
            state={states[`${format}-${v.quality}`]}
            onDownload={() => run(v)}
          />
        ))}
      </div>
    </div>
  );
}

function DownloadResult({ video, onReset }) {
  const [format, setFormat] = useState("MP4");
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/[0.06] sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-3">
          <div className="font-semibold text-slate-900">{video.title}</div>
          <div className="text-sm text-slate-500">{video.author}</div>
        </div>
        <button
          onClick={onReset}
          className="shrink-0 rounded-lg p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-600/25"
          aria-label="Clear and paste a new link"
        >
          <Icon path={icons.close} />
        </button>
      </div>
      <div className="my-5 h-px bg-slate-200" />
      <QualitySelector video={video} format={format} onFormatChange={setFormat} />
    </div>
  );
}

export function Downloader({ compact, autoFocus, placeholder }) {
  const [url, setUrl] = useState("");
  const [status, setStatus] = useState("idle");
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  const submit = useCallback(async () => {
    if (!url.trim()) return;
    setStatus("loading");
    setError("");
    try {
      const result = await downloaderApi.resolve(url.trim());
      setVideo(result);
      setStatus("ready");
    } catch (e) {
      setError(e.message || "Something went wrong. Try again.");
      setStatus("error");
    }
  }, [url]);

  const reset = () => {
    setStatus("idle");
    setVideo(null);
    setUrl("");
  };

  return (
    <div>
      {status !== "ready" && (
        <UrlInput
          value={url}
          onChange={setUrl}
          onSubmit={submit}
          loading={status === "loading"}
          autoFocus={autoFocus}
          compact={compact}
          placeholder={placeholder}
        />
      )}
      {status === "loading" && <div className="mt-4"><ResultSkeleton /></div>}
      {status === "error" && (
        <div className="mt-4">
          <ErrorState message={error} onRetry={() => { setStatus("idle"); setError(""); }} />
        </div>
      )}
      {status === "ready" && video && <DownloadResult video={video} onReset={reset} />}
    </div>
  );
}
