CREATE TYPE "public"."presale_claim_status" AS ENUM('UNCLAIMED', 'CLAIMED');--> statement-breakpoint
CREATE TABLE "presale" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"payment_reference" text NOT NULL,
	"provider" text DEFAULT 'paystack' NOT NULL,
	"amount" text NOT NULL,
	"currency" text DEFAULT 'NGN' NOT NULL,
	"plan" text NOT NULL,
	"perks_snapshot" jsonb NOT NULL,
	"claim_status" "presale_claim_status" DEFAULT 'UNCLAIMED' NOT NULL,
	"claimed_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "presale_payment_reference_unique" UNIQUE("payment_reference")
);
--> statement-breakpoint
CREATE INDEX "presale_email_idx" ON "presale" USING btree ("email");--> statement-breakpoint
CREATE INDEX "presale_claim_status_idx" ON "presale" USING btree ("claim_status");