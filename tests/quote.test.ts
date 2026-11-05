import { test } from "node:test";
import assert from "node:assert/strict";
import { POST } from "../app/api/quote/route";
import { quoteServices } from "../lib/quote";

const valid = {
  name: "Test Client",
  email: "client@example.com",
  company: "Example Ltd",
  phone: "",
  service: quoteServices[0],
  budget: "Not sure yet",
  timeline: "Within 1 month",
  details: "We need a new website with online booking.",
  website: "",
  requestId: "c3c5f620-8a52-4fa2-807a-b38864cd74a0",
};
const request = (body: unknown = valid, origin = "https://example.com") =>
  new Request("https://example.com/api/quote", {
    method: "POST",
    headers: { origin, "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("quote submissions validate requests and only confirm accepted email", async () => {
  const oldKey = process.env.RESEND_API_KEY;
  const oldFrom = process.env.CONTACT_FROM_EMAIL;
  const originalFetch = globalThis.fetch;
  let sent = 0;
  let providerStatus = 200;
  let providerBody: unknown = { id: "email-id" };
  globalThis.fetch = async (url, options) => {
    sent++;
    assert.equal(url, "https://api.resend.com/emails");
    const payload = JSON.parse(options?.body as string);
    assert.deepEqual(payload.to, ["support@aimdigitallimited.co.uk"]);
    assert.equal(payload.reply_to, valid.email);
    assert.equal(payload.from, "quotes@example.com");
    assert.ok(payload.text.includes(valid.details));
    assert.ok(payload.text.includes(valid.budget));
    assert.ok(payload.text.includes(valid.timeline));
    assert.ok(payload.text.includes(valid.company));
    assert.equal(
      new Headers(options?.headers).get("Idempotency-Key"),
      `quote/${valid.requestId}`,
    );
    return Response.json(providerBody, { status: providerStatus });
  };
  try {
    delete process.env.RESEND_API_KEY;
    delete process.env.CONTACT_FROM_EMAIL;
    assert.equal((await POST(request())).status, 503);
    assert.equal(sent, 0);
    process.env.RESEND_API_KEY = "test-key";
    process.env.CONTACT_FROM_EMAIL = "quotes@example.com";
    assert.equal(
      (await POST(request(valid, "https://other.example"))).status,
      403,
    );
    for (const invalid of [
      { ...valid, email: "invalid" },
      { ...valid, name: "" },
      { ...valid, name: "Injected\r\nHeader" },
      { ...valid, details: "short" },
      { ...valid, details: "a".repeat(5001) },
      { ...valid, service: "Unknown service" },
      { ...valid, budget: "" },
      { ...valid, timeline: "" },
      { ...valid, website: "spam" },
    ])
      assert.equal((await POST(request(invalid))).status, 400);
    assert.equal(
      (await POST(request({ ...valid, details: "a".repeat(20001) }))).status,
      413,
    );
    assert.equal(sent, 0);
    const accepted = await POST(request());
    assert.equal(accepted.status, 200);
    assert.deepEqual(await accepted.json(), { success: true });
    providerStatus = 422;
    providerBody = { message: "Provider failure" };
    assert.equal((await POST(request())).status, 503);
    providerStatus = 200;
    providerBody = {};
    assert.equal((await POST(request())).status, 503);
    globalThis.fetch = async () => {
      throw new Error("Connection failed");
    };
    assert.equal((await POST(request())).status, 503);
  } finally {
    globalThis.fetch = originalFetch;
    if (oldKey === undefined) delete process.env.RESEND_API_KEY;
    else process.env.RESEND_API_KEY = oldKey;
    if (oldFrom === undefined) delete process.env.CONTACT_FROM_EMAIL;
    else process.env.CONTACT_FROM_EMAIL = oldFrom;
  }
});
