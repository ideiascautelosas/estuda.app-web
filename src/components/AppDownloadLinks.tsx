"use client";

import { trackEvent } from "@/lib/analytics";
import { APP_DOWNLOAD, shouldShowAppDownloadLinks } from "@/lib/app-download";

type AppDownloadLinksProps = {
  className?: string;
  align?: "center" | "left" | "right";
  analyticsLocation?: string;
};

function alignmentClasses(align: AppDownloadLinksProps["align"]): string {
  switch (align) {
    case "left":
      return "items-start text-left";
    case "right":
      return "items-end text-right";
    default:
      return "items-center text-center";
  }
}

function actionsAlignmentClasses(align: AppDownloadLinksProps["align"]): string {
  switch (align) {
    case "left":
      return "justify-start";
    case "right":
      return "justify-end";
    default:
      return "justify-center";
  }
}

function StoreIcon({ store }: { store: "apple" | "google" }) {
  if (store === "apple") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-current">
        <path d="M16.85 13.2c.02 2.4 2.1 3.2 2.12 3.21-.02.06-.33 1.13-1.09 2.23-.66.96-1.35 1.91-2.43 1.93-1.06.02-1.4-.62-2.63-.62s-1.6.6-2.61.64c-1.05.04-1.85-1.03-2.52-1.98-1.37-1.97-2.42-5.56-1.02-7.99.7-1.21 1.96-1.97 3.33-1.99 1.04-.02 2.02.71 2.63.71.62 0 1.82-.88 3.07-.75.52.02 1.99.21 2.93 1.58-.08.05-1.75 1.03-1.78 3.03ZM14.93 6.68c.56-.68.94-1.63.84-2.58-.81.03-1.79.54-2.38 1.22-.53.61-.99 1.58-.87 2.51.89.07 1.8-.45 2.41-1.15Z" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0">
      <path fill="#34A853" d="M8.1 5.1c-.4-.2-.9-.2-1.2.1L6 6.1l5.4 5.4 2.1-2.1L8.1 5.1Z" />
      <path fill="#4285F4" d="M5.2 6.9C4.9 7.2 4.8 7.6 4.8 8v8c0 .4.1.8.4 1.1L10.5 12 5.2 6.9Z" />
      <path fill="#FBBC05" d="M16.1 10.8 13.8 12l-2.1 2.1 2.4 2.4 2 1c.6.3 1.3.2 1.8-.2l1.6-1c.7-.4.7-1.4 0-1.8l-3.4-1.9Z" />
      <path fill="#EA4335" d="m13.8 12 2.3-1.2 3.5-2c.7-.4.7-1.4 0-1.8l-1.6-1c-.5-.4-1.2-.5-1.8-.2l-2.4 1.2-2.1 2.1 2.1 2.9Z" />
      <path fill="#A142F4" d="M10.5 12 5.2 17.1c.3.3.7.4 1.1.4.2 0 .4 0 .6-.1l2.2-1.1 2.4-2.4L10.5 12Z" />
    </svg>
  );
}

export function AppDownloadLinks({ className = "", align = "center", analyticsLocation = "unknown" }: AppDownloadLinksProps) {
  if (!shouldShowAppDownloadLinks()) return null;

  return (
    <div className={`flex flex-col gap-3 ${alignmentClasses(align)} ${className}`.trim()}>
      <p className="text-sm font-medium text-slate-600">Baixe o app e continue seus estudos no celular</p>
      <div className={`flex flex-wrap gap-3 ${actionsAlignmentClasses(align)}`}>
        {APP_DOWNLOAD.appleUrl && (
          <a
            href={APP_DOWNLOAD.appleUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("app_store_click", { store: "apple", location: analyticsLocation })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <StoreIcon store="apple" />
            Baixar na App Store
          </a>
        )}
        {APP_DOWNLOAD.googleUrl && (
          <a
            href={APP_DOWNLOAD.googleUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => trackEvent("app_store_click", { store: "google_play", location: analyticsLocation })}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-slate-400 hover:bg-slate-50"
          >
            <StoreIcon store="google" />
            Baixar no Google Play
          </a>
        )}
      </div>
    </div>
  );
}