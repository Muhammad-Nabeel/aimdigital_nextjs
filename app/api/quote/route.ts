import { quoteEmail, quoteMessage, quoteSchema } from "@/lib/quote";

const failed = () =>
  Response.json(
    {
      error:
        "We couldn’t send your request. Please try again or email support@aimdigitallimited.co.uk directly.",
    },
    { status: 503 },
  );

export async function POST(request: Request) {
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return Response.json(
      { error: "Please submit the form from our website." },
      { status: 403 },
    );
  }
  let raw: unknown;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).length > 20000) {
      return Response.json(
        {
          error:
            "Your request is too long. Please shorten the project description.",
        },
        { status: 413 },
      );
    }
    raw = JSON.parse(body);
  } catch {
    return Response.json(
      { error: "Please check your form details." },
      { status: 400 },
    );
  }
  const result = quoteSchema.safeParse(raw);
  if (!result.success) {
    return Response.json(
      {
        error:
          "Please fill in all required fields with valid details (project description: 10–5,000 characters).",
      },
      { status: 400 },
    );
  }
  const quote = result.data;
  if (quote.website) {
    return Response.json(
      { error: "We couldn’t accept this request. Please email us directly." },
      { status: 400 },
    );
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) return failed();

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "Idempotency-Key": `quote/${quote.requestId}`,
      },
      body: JSON.stringify({
        from,
        to: [quoteEmail],
        reply_to: quote.email,
        subject: `Quote request: ${quote.service} — ${quote.name}`,
        text: quoteMessage(quote),
      }),
      signal: AbortSignal.timeout(10000),
    });
    if (!response.ok) return failed();
    const sent = await response.json();
    if (!sent.id) return failed();
    return Response.json({ success: true });
  } catch {
    return failed();
  }
}
