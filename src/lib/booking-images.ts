const IMAGE_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
]);
const IMAGE_EXTS = new Set(["jpg", "jpeg", "png", "webp", "heic", "heif"]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const BUCKET = "booking-references";

export function isBookingImageFile(file: File) {
  if (file.type && IMAGE_TYPES.has(file.type)) return true;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return IMAGE_EXTS.has(ext) && (!file.type || file.type === "application/octet-stream");
}

function supabaseBrowser() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function publicObjectUrl(projectUrl: string, path: string) {
  return `${projectUrl.replace(/\/$/, "")}/storage/v1/object/public/${BUCKET}/${path}`;
}

/** Upload idea photos from the browser so large phone images skip Vercel’s body limit. */
export async function uploadBookingReferenceImages(
  files: File[]
): Promise<{ urls: string[]; warning?: string }> {
  if (files.length === 0) return { urls: [] };

  const env = supabaseBrowser();
  if (!env) {
    return {
      urls: [],
      warning: "Photos were not uploaded — storage is not configured yet.",
    };
  }

  const urls: string[] = [];

  for (const file of files.slice(0, 4)) {
    if (!isBookingImageFile(file)) {
      return { urls, warning: "Images must be JPEG, PNG, WebP, or HEIC." };
    }
    if (file.size > MAX_IMAGE_BYTES) {
      return { urls, warning: "Each image must be under 5MB." };
    }

    const safeName = file.name.replace(/[^\w.\-]+/g, "_").slice(0, 80);
    const path = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}-${safeName}`;

    const res = await fetch(
      `${env.url.replace(/\/$/, "")}/storage/v1/object/${BUCKET}/${path}`,
      {
        method: "POST",
        headers: {
          apikey: env.key,
          Authorization: `Bearer ${env.key}`,
          "Content-Type": file.type || "application/octet-stream",
          "x-upsert": "false",
        },
        body: file,
      }
    );

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error("reference image upload", res.status, detail);
      return {
        urls,
        warning: "Request saved, but photos could not be uploaded.",
      };
    }

    urls.push(publicObjectUrl(env.url, path));
  }

  return { urls };
}
