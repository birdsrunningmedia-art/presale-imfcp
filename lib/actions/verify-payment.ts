"use server";

import { finalizePresalePayment } from "../payment/finalize-payment";

const PRESALE_PRICE = 10_000 * 100; // kobo

export async function verifyPresalePayment(reference: string) {
  // 1️⃣ Verify with Paystack
  let result;
  try {
    const res = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
        cache: "no-store",
      }
    );

    result = await res.json();
  } catch (err) {
    console.error("PAYSTACK_VERIFY_ERROR", err);
    return { success: false, message: "Unable to reach Paystack" };
  }

  if (!result?.data || result.data.status !== "success") {
    return { success: false, message: "Payment not successful" };
  }

  // 2️⃣ Validate amount + currency (anti-tamper)
  if (
    result.data.amount !== PRESALE_PRICE ||
    result.data.currency !== "NGN"
  ) {
    return { success: false, message: "Payment details do not match" };
  }

  // 3️⃣ Extract email from Paystack (SOURCE OF TRUTH)
  const email = result.data.customer?.email;

  if (!email) {
    return { success: false, message: "Customer email missing" };
  }

  // 4️⃣ Finalize presale payment (idempotent)
  const response = await finalizePresalePayment({
    reference,
    email,
    amount: result.data.amount,
    currency: result.data.currency,
  });

  if (!response.ok) {
    return { success: false, message: "Payment confirmation failed" };
  }

  return {
    success: true,
    message: response.alreadyProcessed
      ? "Payment was already confirmed"
      : "Presale payment successful 🎉 Check your email",
  };
}