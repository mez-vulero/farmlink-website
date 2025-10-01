import { NextResponse } from "next/server";

type BookDemoRequest = {
  name?: string;
  email?: string;
  organization?: string;
  phone?: string;
  preferredDate?: string;
  message?: string;
};

function sanitizeBaseUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

export async function POST(request: Request) {
  let body: BookDemoRequest;
  try {
    body = await request.json();
  } catch (parseError) {
    console.error("Invalid JSON payload for book demo", parseError);
    return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const organization = body.organization?.trim();
  const phone = body.phone?.trim();
  const preferredDate = body.preferredDate?.trim();
  const message = body.message?.trim();

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  const frappeBaseUrl = process.env.FRAPPE_BASE_URL;
  const frappeApiKey = process.env.FRAPPE_API_KEY;
  const frappeApiSecret = process.env.FRAPPE_API_SECRET;

  if (!frappeBaseUrl || !frappeApiKey || !frappeApiSecret) {
    console.error("Frappe booking integration is not configured.");
    return NextResponse.json({ error: "Booking service is currently unavailable." }, { status: 503 });
  }

  const payload = {
    lead_name: name,
    email_id: email,
    company_name: organization,
    phone,
    source: "Website",
    status: "Lead",
    ...(preferredDate ? { contact_date: preferredDate } : {}),
    ...(message ? { notes: message } : {}),
  };

  try {
    const response = await fetch(
      `${sanitizeBaseUrl(frappeBaseUrl)}/api/resource/Lead`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `token ${frappeApiKey}:${frappeApiSecret}`,
        },
        body: JSON.stringify({ data: payload }),
      },
    );

    if (!response.ok) {
      const text = await response.text();
      console.error("Frappe booking failed", response.status, text);
      return NextResponse.json({ error: "Unable to create booking." }, { status: 502 });
    }
  } catch (error) {
    console.error("Frappe booking request failed", error);
    return NextResponse.json({ error: "Unable to reach booking service." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
