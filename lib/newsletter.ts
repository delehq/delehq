import "server-only";

type SubscribeResult =
  | { success: true; alreadySubscribed?: boolean }
  | { success: false; error: string };

// Subscribes an email to the Buttondown newsletter. Returns success even
// when the address is already subscribed — a repeat signup shouldn't feel
// like an error to the visitor, it should just confirm they're on the list.
export async function subscribeToNewsletter(email: string): Promise<SubscribeResult> {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) return { success: false, error: "Newsletter signup isn't configured yet." };

  const res = await fetch("https://api.buttondown.email/v1/subscribers", {
    method: "POST",
    headers: {
      Authorization: `Token ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_address: email }),
  });

  if (res.ok) return { success: true };

  const data = (await res.json().catch(() => null)) as { code?: string } | null;
  if (data?.code === "email_already_exists") {
    return { success: true, alreadySubscribed: true };
  }

  return { success: false, error: "Something went wrong. Please try again." };
}
