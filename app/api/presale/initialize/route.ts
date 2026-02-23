import { NextResponse } from "next/server";
import { db } from "@/db";
import { presale } from "@/db/schema";
import { eq } from "drizzle-orm";

const PRESALE_PRICE = 10_000 * 100;

export async function POST(req: Request) {
  const { email } = await req.json();

  if (!email) {
    return NextResponse.json(
      { message: "Email is required" },
      { status: 400 }
    );
  }

  // 🚫 Block duplicate purchases
  const existing = await db.query.presale.findFirst({
    where: eq(presale.email, email),
  });

  if (existing) {
    return NextResponse.json(
      { message: "This email already has presale access" },
      { status: 409 }
    );
  }

  const res = await fetch(
    "https://api.paystack.co/transaction/initialize",
    {
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
          plan: "early-pro",
        },
      }),
    }
  );

  const data = await res.json();

  if (!data.status) {
    return NextResponse.json(
      { message: "Paystack initialization failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    reference: data.data.reference,
  });
}