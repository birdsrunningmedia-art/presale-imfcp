import crypto from "crypto";
import { headers } from "next/headers";
import { finalizePresalePayment } from "@/lib/payment/finalize-payment";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("x-paystack-signature") ?? "";

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return new Response("Invalid signature", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event !== "charge.success") {
    return new Response("Ignored", { status: 200 });
  }

  const data = event.data;
  const email = data.customer?.email;

  if (!email) {
    return new Response("Missing email", { status: 400 });
  }

  const result = await finalizePresalePayment({
    reference: data.reference,
    email,
    amount: data.amount,
    currency: data.currency,
  });

  if (!result.ok) {
    return new Response("Server error", { status: 500 });
  }

  return new Response("OK", { status: 200 });
}