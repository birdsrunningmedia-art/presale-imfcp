import { NextResponse } from "next/server";
import { db } from "@/db";
import { presaleTable } from "@/db/schema";
import { eq } from "drizzle-orm";

const PRESALE_PRICE = 10_000 * 100; // kobo

export async function POST(req: Request) {
  try {
    // 1️⃣ Safely parse JSON
    const body = await req.json().catch(() => null);

    const email = body?.email;

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    // 2️⃣ Block duplicate purchases (email-level)
    const existing = await db.query.presaleTable.findFirst({
      where: eq(presaleTable.email, email),
    });

    if (existing) {
      return NextResponse.json(
        { error: "This email already has presale access" },
        { status: 409 }
      );
    }

    // 3️⃣ Initialize Paystack transaction
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

    if (!data?.status || !data?.data?.reference) {
      console.error("PAYSTACK_INIT_FAILED", data);

      return NextResponse.json(
        { error: "Paystack initialization failed" },
        { status: 502 }
      );
    }

    // 4️⃣ Return reference only (popup flow)
    return NextResponse.json({
      reference: data.data.reference,
    });
  } catch (err) {
    console.error("PRESALE_INIT_ERROR", err);

    return NextResponse.json(
      { error: "Unable to initialize presale payment" },
      { status: 500 }
    );
  }
}