import "server-only";
import { JWT } from "google-auth-library";

// Google's Indexing API — the Google-specific equivalent of the IndexNow
// ping (see lib/indexnow.ts), which Google itself doesn't participate in.
// Requires a service account (console.cloud.google.com) that's also added
// as an Owner on this property in Search Console, otherwise Google rejects
// the call even with a valid, correctly-signed credential.
//
// Deliberately does nothing if the credential env var isn't set, and never
// throws — same pattern as every other "notify on publish" side effect.

function getClient(): JWT | null {
  const raw = process.env.GOOGLE_INDEXING_SERVICE_ACCOUNT_JSON;
  if (!raw) return null;

  const credentials = JSON.parse(raw) as { client_email: string; private_key: string };
  return new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/indexing"],
  });
}

export async function requestGoogleIndexing(url: string) {
  try {
    const client = getClient();
    if (!client) return;

    await client.request({
      url: "https://indexing.googleapis.com/v3/urlNotifications:publish",
      method: "POST",
      data: { url, type: "URL_UPDATED" },
    });
  } catch {
    // Ignore — a rejected or failed indexing request must never surface as
    // an error on a post that already saved successfully.
  }
}
