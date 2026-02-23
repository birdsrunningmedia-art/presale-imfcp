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
    const inserted = await db
      .insert(presale)
      .values({
        id: crypto.randomUUID(),
        email,
        paymentReference: reference,
        provider: "paystack",
        amount: (amount / 100).toString(),
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
        // protects against:
        // - webhook replay
        // - same email purchase
        target: [presale.paymentReference, presale.email],
      })
      .returning({ id: presale.id });

    // Nothing inserted → already purchased
    if (inserted.length === 0) {
      return { ok: true, alreadyProcessed: true };
    }

    // First successful insert → send confirmation email
    try {
      await sendPresaleConfirmationEmail({ email, reference });
    } catch (err) {
      // email failure must NOT break payment
      console.error("PRESALE_EMAIL_FAILED", err);
    }

    return { ok: true, alreadyProcessed: false };
  } catch (err) {
    console.error("FINALIZE_PRESALE_ERROR", err);
    return { ok: false, error: "Failed to finalize presale payment" };
  }
}