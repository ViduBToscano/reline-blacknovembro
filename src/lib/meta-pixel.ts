// Meta Pixel — carrega somente com consentimento de cookies ("accepted"
// em localStorage["reline-lgpd-consent"]). Sem consentimento, nada é enviado.

export const META_PIXEL_ID = "386976746397175";
const CONSENT_KEY = "reline-lgpd-consent";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

let initialized = false;

export function hasAdsConsent(): boolean {
  try {
    return localStorage.getItem(CONSENT_KEY) === "accepted";
  } catch {
    return false;
  }
}

function dispatch(args: unknown[]) {
  const fbq = window.fbq;
  if (!fbq) return;
  if (fbq.callMethod) fbq.callMethod.apply(fbq, args);
  else fbq.queue.push(args);
}

export function initMetaPixel() {
  if (initialized || typeof window === "undefined" || !hasAdsConsent()) return;
  initialized = true;

  if (!window.fbq) {
    const fbq = function (...args: unknown[]) {
      dispatch(args);
    } as Fbq;
    fbq.queue = [];
    fbq.push = fbq;
    fbq.loaded = true;
    fbq.version = "2.0";
    window.fbq = fbq;
    window._fbq = fbq;

    const script = document.createElement("script");
    script.async = true;
    script.src = "https://connect.facebook.net/en_US/fbevents.js";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(script, first);
  }

  dispatch(["init", META_PIXEL_ID]);
  dispatch(["track", "PageView"]);
}

export function trackMetaEvent(
  event: string,
  params?: Record<string, unknown>,
  options?: { eventID?: string },
) {
  if (typeof window === "undefined" || !hasAdsConsent() || !window.fbq) return;
  dispatch(options?.eventID ? ["track", event, params ?? {}, options] : ["track", event, params ?? {}]);
}
