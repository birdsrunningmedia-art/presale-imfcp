import crypto from "crypto";
import { db } from "@/db";
import { presaleTable } from "@/db/schema";
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
      .insert(presaleTable)
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
        target: presaleTable.paymentReference,
      })
      .returning({ id: presaleTable.id });

    // 🔁 Webhook retry → already handled
    if (inserted.length === 0) {
      return { ok: true, alreadyProcessed: true };
    }

    // 📧 Confirmation email (non-fatal)
    try {
      await sendPresaleConfirmationEmail({
        email,
        reference,
      });
    } catch (err) {
      console.error("PRESALE_EMAIL_FAILED", { email, reference, err });
    }

    return { ok: true, alreadyProcessed: false };
  } catch (err: any) {
    // 🚫 Email already purchased (unique email constraint)
    if (err?.code === "23505") {
      return { ok: true, alreadyProcessed: true };
    }

    console.error("FINALIZE_PRESALE_ERROR", {
      reference,
      email,
      err,
    });

    return { ok: false, error: "Failed to finalize presale payment" };
  }
}