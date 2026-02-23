"use client";

import { useState } from "react";
import { Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EmailFormSchema } from "@/schema/schema";
import { type EmailFormSchemaType } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";

const PRODUCT = {
  name: "Early Pro Access",
  price: 10_000,
};

export default function PresaleCheckoutPage() {
  const [loading, setLoading] = useState(false);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;

  const form = useForm<EmailFormSchemaType>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: EmailFormSchemaType) => {
    try {
      setLoading(true);

      // 1️⃣ Initialize transaction
      const res = await fetch("/api/presale/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await res.json();

      if (!res.ok || !data.reference) {
        throw new Error("Failed to initialize payment");
      }

      // 2️⃣ Paystack popup
      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email: values.email,
        amount: PRODUCT.price * 100,
        reference: data.reference,

        onSuccess: () => {
          toast.success("Payment received. Finalizing…");
        },

        onCancel: () => {
          toast.error("Payment cancelled");
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

        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>
                    Email address
                  </FieldLabel>

                  <input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    className="
                      w-full rounded-lg bg-brand-black
                      border border-brand-white/20
                      px-4 py-3 text-brand-white
                      outline-none focus:border-brand-white
                    "
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Button
              type="submit"
              disabled={loading}
              className="h-12 w-full mt-4"
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
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}