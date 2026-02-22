"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const PRODUCT = {
  name: "Early Pro Access",
  price: 10_000, // naira
};

export default function PresaleCheckoutPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const handlePayment = async () => {
    try {
      setError("");
      setLoading(true);

      if (!email) {
        setError("Please enter your email");
        return;
      }

      // 1️⃣ Initialize transaction
      const res = await fetch("/api/presale/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok || !data.reference) {
        throw new Error("Failed to initialize payment");
      }

      const { reference } = data;

      // 2️⃣ Paystack popup
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email,
        amount: PRODUCT.price * 100,
        reference,

        onSuccess: () => {
          toast.success("Payment received. Finalizing…");
          // webhook will confirm + unlock presale
        },

        onCancel: () => {
          setError("Payment cancelled");
        },
      });
    } catch (err) {
      console.error(err);
      toast.error("Payment could not be started");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-6">
      <div className="w-full max-w-sm space-y-6">
        <h1 className="text-2xl font-semibold text-brand-white text-center">
          Early Pro Access
        </h1>

        <p className="text-brand-white/60 text-center">
          ₦{PRODUCT.price.toLocaleString()} · one-time payment
        </p>

        {/* Email field */}
        <div className="space-y-2">
          <label className="text-sm text-brand-white/70">
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              w-full rounded-lg bg-brand-black
              border border-brand-white/20
              px-4 py-3 text-brand-white
              outline-none focus:border-brand-white
            "
          />
        </div>

        {error && (
          <p className="text-sm text-brand-orange">{error}</p>
        )}

        {/* CTA */}
        <Button
          onClick={handlePayment}
          disabled={loading}
          className="h-12 w-full"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing…
            </>
          ) : (
            <>
              <Lock className="mr-2 h-4 w-4" />
              Pay ₦{PRODUCT.price.toLocaleString()}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}


