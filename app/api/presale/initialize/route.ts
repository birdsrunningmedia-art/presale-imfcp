import { NextResponse } from "next/server";

const PRESALE_PRICE = 10_000 * 100;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: PRESALE_PRICE,
      metadata: {
        presale: true,
      },
    }),
  });

  const data = await res.json();

  if (!data.status) {
    return NextResponse.json(
      { error: "Paystack init failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    authorizationUrl: data.data.authorization_url,
    reference: data.data.reference,
  });
}
