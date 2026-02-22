import crypto from "crypto";
import { db } from "@/db";
import { presale } from "@/db/schema";

type FinalizePresaleInput = {
  reference: string;
  email: string;
  amount: number; // from Paystack (kobo)
  currency: string;
};

type FinalizePresaleResult =
  | { ok: true; alreadyProcessed: boolean }
  | { ok: false; error: string };

export async function finalizePresalePayment(
  input: FinalizePresaleInput
): Promise<FinalizePresaleResult> {
  const { reference, email, amount, currency } = input;

  try {
    // 1️⃣ Insert presale record (idempotent)
    const inserted = await db
      .insert(presale)
      .values({
        id: crypto.randomUUID(),
        email,
        paymentReference: reference,
        provider: "paystack",
        amount: (amount / 100).toString(), // store in major unit
        currency,

        plan: "early-pro", // hardcoded since one product
        perksSnapshot: {
          tier: "premium",
          earlyAccess: true,
        },

        claimStatus: "UNCLAIMED",
      })
      .onConflictDoNothing({
        target: presale.paymentReference, // webhook idempotency
      })
      .returning({ id: presale.id });

    // 2️⃣ Already processed?
    if (inserted.length === 0) {
      return { ok: true, alreadyProcessed: true };
    }

    return { ok: true, alreadyProcessed: false };
  } catch (err) {
    console.error("FINALIZE_PRESALE_ERROR", {
      reference,
      email,
      err,
    });

    return { ok: false, error: "Failed to finalize presale payment" };
  }
}