function envFlag(value: string | undefined): boolean {
  return value === "1" || value === "true";
}

function envUrl(value: string | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed ? trimmed : null;
}

export const APP_DOWNLOAD = {
  enabled: envFlag(process.env.NEXT_PUBLIC_ENABLE_APP_DOWNLOAD_LINKS),
  appleUrl: envUrl(process.env.NEXT_PUBLIC_APPLE_APP_STORE_URL),
  googleUrl: envUrl(process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL),
} as const;

export function shouldShowAppDownloadLinks(): boolean {
  return APP_DOWNLOAD.enabled && Boolean(APP_DOWNLOAD.appleUrl || APP_DOWNLOAD.googleUrl);
}