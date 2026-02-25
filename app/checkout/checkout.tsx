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
import { EmailFormSchema, type EmailFormSchemaType } from "@/schema/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, cubicBezier } from "framer-motion";
import { formatNumber } from "@/utils/helpers";

const PRODUCT = {
  name: "Early Pro Access",
  price: 10_000,
};

const ease = cubicBezier(0.22, 1, 0.36, 1);

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function PresaleCheckoutPage({
  pricing,
}: {
  pricing: {
    symbol: string;
    amount: number;
    currency: string;
  };
}) {
  const [loading, setLoading] = useState(false);
  const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
  const form = useForm<EmailFormSchemaType>({
    resolver: zodResolver(EmailFormSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (values: EmailFormSchemaType) => {
    if (loading) return;

    try {
      setLoading(true);
      const res = await fetch("/api/presale/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await res.json();

      if (
        res.status === 409 &&
        data.error === "This email already has presale access"
      ) {
        toast.error("This email has already purchased Early Pro Access.");
        return;
      }

      if (!res.ok || !data.reference)
        throw new Error(data?.error ?? "Initialization failed");

      const PaystackPop = (await import("@paystack/inline-js")).default;
      const paystack = new PaystackPop();

      paystack.newTransaction({
        key: publicKey,
        email: values.email,
        amount: PRODUCT.price * 100,
        reference: data.reference,
        onSuccess: () =>
          toast.success("Payment received! Check your email for confirmation."),
        onCancel: () => toast.message("Payment cancelled"),
      });
    } catch (err) {
      console.error("PRESALE_INIT_ERROR", err);
      toast.error("Unable to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-6">
      <motion.div
        className="w-full max-w-sm space-y-8 bg-brand-black/80 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-white/10"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
      >
        {/* Logo */}
        <motion.div variants={fadeUp} className="flex justify-center">
          <img src="/logo/logoOrange.svg" alt="Logo" className="h-12 w-auto" />
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={fadeUp}
          className="text-2xl font-semibold text-white text-center"
        >
          Early Pro Access
        </motion.h1>

        {/* Subtext */}
        <motion.p variants={fadeUp} className="text-center text-white/60">
          {pricing.symbol}
          {formatNumber(pricing.amount)} · one-time payment
        </motion.p>

        {/* Guiding text */}
        <motion.p
          variants={fadeUp}
          className="text-center text-sm text-white/50"
        >
          Enter your email below to secure your lifetime access.
        </motion.p>

        {/* Form */}
        <motion.form
          variants={fadeUp}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                  <input
                    {...field}
                    id={field.name}
                    type="email"
                    placeholder="you@example.com"
                    aria-invalid={fieldState.invalid}
                    disabled={loading}
                    className="
                      w-full rounded-lg bg-brand-black/70
                      border border-white/20 px-4 py-3
                      text-white outline-none focus:border-white
                      disabled:opacity-60
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
              className="h-12 w-full mt-2"
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
        </motion.form>
      </motion.div>
    </div>
  );
}
