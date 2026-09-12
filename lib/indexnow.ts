import "server-only";
import { SITE_URL } from "@/lib/constants";

// IndexNow lets a site tell participating search engines ("Bing, and a few
// others — not Google, which runs its own separate Indexing API) the moment
// a page is published or changed, instead of waiting for the next scheduled
// crawl. The key below isn't a secret: it's proven by hosting a matching
// public file at /<key>.txt (see public/97526ff01424f8fa62cf8df0d2c8c518.txt),
// which is how the protocol verifies the submission actually came from this
// site's owner.
const INDEXNOW_KEY = "97526ff01424f8fa62cf8df0d2c8c518";

// Best-effort only — a failed or slow ping to a third-party API should never
// hold up or fail a publish/update that already succeeded in the database.
export async function pingIndexNow(url: string) {
  try {
    await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key: INDEXNOW_KEY,
        keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: [url],
      }),
    });
  } catch {
    // Ignore — this is a courtesy ping, not a requirement.
  }
}
