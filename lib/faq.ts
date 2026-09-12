export type Faq = { question: string; answer: string };

// The admin form edits FAQs as plain text in a "Q: ... / A: ..." format
// rather than a repeating-field UI, since that's the simplest thing to type
// and read back. These two functions are the only place that format is
// parsed or produced, used from both the client form and the server action.

export function parseFaqsText(raw: string): Faq[] {
  const blocks = raw.split(/\n\s*\n/);
  const faqs: Faq[] = [];

  for (const block of blocks) {
    const match = block.match(/^\s*Q:\s*([\s\S]*?)\n\s*A:\s*([\s\S]*)$/i);
    if (!match) continue;
    const question = match[1].trim();
    const answer = match[2].trim();
    if (question && answer) faqs.push({ question, answer });
  }

  return faqs;
}

export function faqsToText(faqs: Faq[] | null | undefined): string {
  if (!faqs || faqs.length === 0) return "";
  return faqs.map((f) => `Q: ${f.question}\nA: ${f.answer}`).join("\n\n");
}
