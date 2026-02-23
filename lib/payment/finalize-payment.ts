import crypto from "crypto";
import { db } from "@/db";
import { presale } from "@/db/schema";
import { sendPresaleConfirmationEmail } from "@/lib/email/send-presale-confirmation";

type FinalizePresaleInput = {
  reference: string;
  email: string;
  amount: number; // kobo
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
    // 1️⃣ Insert presale purchase (idempotent)
    const inserted = await db
      .insert(presale)
      .values({
        id: crypto.randomUUID(),
        email,
        paymentReference: reference,
        provider: "paystack",
        amount: (amount / 100).toString(), // store major unit
        currency,

        plan: "early-pro",
        perksSnapshot: {
          tier: "premium",
          earlyAccess: true,
          lifetime: true,
        },

        claimStatus: "UNCLAIMED",
      })
      .onConflictDoNothing({
        target: presale.paymentReference,
      })
      .returning({ id: presale.id });

    // 2️⃣ If already processed → DO NOT resend email
    if (inserted.length === 0) {
      return { ok: true, alreadyProcessed: true };
    }

    // 3️⃣ Send confirmation email (fire-and-forget safe)
    try {
      await sendPresaleConfirmationEmail({
        email,
        reference,
      });
    } catch (emailErr) {
      // Email failure should NOT fail payment
      console.error("PRESALE_EMAIL_FAILED", {
        email,
        reference,
        emailErr,
      });
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