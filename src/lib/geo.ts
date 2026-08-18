import { setDefaultResultOrder } from "node:dns";

/** Vercel/AWS often stall on IPv6 (AAAA) and surface that as `TypeError: fetch failed`. */
try {
  setDefaultResultOrder("ipv4first");
} catch {
  // dns order is not available in some edge runtimes
}

export type GeoPoint = { lat: number; lng: number };

const FETCH_MS = 4000;
const USER_AGENT = "DirtyInk/1.0 (https://dirty-ink.vercel.app/book)";

export const AREA_CENTROIDS: Record<string, GeoPoint> = {
  "South Bay": { lat: 33.864, lng: -118.396 },
  DTLA: { lat: 34.04, lng: -118.247 },
  Hollywood: { lat: 34.102, lng: -118.327 },
  "Silver Lake": { lat: 34.087, lng: -118.27 },
  "Echo Park": { lat: 34.078, lng: -118.26 },
  "Los Feliz": { lat: 34.108, lng: -118.285 },
  "West Hollywood": { lat: 34.09, lng: -118.362 },
  "Santa Monica": { lat: 34.019, lng: -118.491 },
  Venice: { lat: 33.985, lng: -118.469 },
  "Culver City": { lat: 34.021, lng: -118.396 },
  "Mid-City": { lat: 34.053, lng: -118.343 },
  Koreatown: { lat: 34.058, lng: -118.301 },
  Pasadena: { lat: 34.148, lng: -118.145 },
  "Long Beach": { lat: 33.77, lng: -118.194 },
};

const US_ZIP = /^(\d{5})(?:-\d{4})?$/;

function logFetchFailure(provider: string, error: unknown) {
  const cause =
    error instanceof Error && "cause" in error ? error.cause : undefined;
  console.error(`[geocode:${provider}]`, error, cause ?? "");
}

async function fetchJson(url: string, provider: string): Promise<unknown | null> {
  try {
    const res = await fetch(url, {
      headers: {
        Accept: "application/json",
        "User-Agent": USER_AGENT,
      },
      cache: "no-store",
      signal: AbortSignal.timeout(FETCH_MS),
    });
    if (!res.ok) {
      console.error(`[geocode:${provider}] HTTP ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    logFetchFailure(provider, error);
    return null;
  }
}

function parseZip(query: string): string | null {
  const compact = query.trim();
  const direct = compact.match(US_ZIP);
  if (direct) return direct[1];
  const embedded = compact.match(/\b(\d{5})(?:-\d{4})?\b/);
  return embedded ? embedded[1] : null;
}

async function geocodeZippopotam(zip: string): Promise<GeoPoint | null> {
  const json = (await fetchJson(
    `https://api.zippopotam.us/us/${zip}`,
    "zippopotam"
  )) as { places?: Array<{ latitude?: string; longitude?: string }> } | null;
  const place = json?.places?.[0];
  const lat = Number(place?.latitude);
  const lng = Number(place?.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

async function geocodeOpenMeteo(query: string): Promise<GeoPoint | null> {
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?" +
    new URLSearchParams({
      name: query,
      count: "5",
      language: "en",
      format: "json",
    }).toString();
  const json = (await fetchJson(url, "open-meteo")) as {
    results?: Array<{ latitude: number; longitude: number; country_code?: string }>;
  } | null;
  const results = json?.results ?? [];
  const preferred =
    results.find((r) => r.country_code === "US") ?? results[0];
  if (!preferred) return null;
  const lat = Number(preferred.latitude);
  const lng = Number(preferred.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

async function geocodeNominatim(query: string): Promise<GeoPoint | null> {
  const url =
    "https://nominatim.openstreetmap.org/search?" +
    new URLSearchParams({
      q: query,
      format: "jsonv2",
      limit: "1",
      countrycodes: "us",
    }).toString();
  const json = (await fetchJson(url, "nominatim")) as
    | Array<{ lat?: string; lon?: string }>
    | null;
  const hit = Array.isArray(json) ? json[0] : null;
  const lat = Number(hit?.lat);
  const lng = Number(hit?.lon);
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null;
  return { lat, lng };
}

/** Resolve a city, address, or US ZIP. Never throws `TypeError: fetch failed` to callers. */
export async function geocodeQuery(query: string): Promise<GeoPoint | null> {
  const q = query.trim();
  if (!q) return null;

  const zip = parseZip(q);
  if (zip) {
    const fromZip = await geocodeZippopotam(zip);
    if (fromZip) return fromZip;
  }

  const fromMeteo = await geocodeOpenMeteo(q);
  if (fromMeteo) return fromMeteo;

  if (zip) {
    const fromMeteoZip = await geocodeOpenMeteo(zip);
    if (fromMeteoZip) return fromMeteoZip;
  }

  return geocodeNominatim(q);
}

export function haversineMiles(a: GeoPoint, b: GeoPoint): number {
  const R = 3958.8;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLng = ((b.lng - a.lng) * Math.PI) / 180;
  const lat1 = (a.lat * Math.PI) / 180;
  const lat2 = (b.lat * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(h)));
}

export function coordsForShop(shop: {
  lat?: number | null;
  lng?: number | null;
  area?: string | null;
}): GeoPoint | null {
  const lat = shop.lat == null ? NaN : Number(shop.lat);
  const lng = shop.lng == null ? NaN : Number(shop.lng);
  if (Number.isFinite(lat) && Number.isFinite(lng)) return { lat, lng };
  if (shop.area && AREA_CENTROIDS[shop.area]) return AREA_CENTROIDS[shop.area];
  return null;
}
