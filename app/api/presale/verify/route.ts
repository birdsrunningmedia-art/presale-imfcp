import { NextResponse } from "next/server";
import { db } from "@/db";
import { presaleTable } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { message: "Missing reference" },
      { status: 400 }
    );
  }

  const record = await db.query.presaleTable.findFirst({
    where: eq(presaleTable.paymentReference, reference),
  });

  if (!record) {
    return NextResponse.json(
      { message: "Payment not yet confirmed" },
      { status: 404 }
    );
  }

  return NextResponse.json({ success: true });
}