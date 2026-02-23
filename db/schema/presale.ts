import {
  pgTable,
  text,
  timestamp,
  index,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";

export const presaleClaimStatusEnum = pgEnum("presale_claim_status", [
  "UNCLAIMED",
  "CLAIMED",
]);

export const presale = pgTable(
  "presale",
  {
    id: text("id").primaryKey(), // cuid / uuid

    email: text("email").notNull().unique(),

    // payment
    paymentReference: text("payment_reference").notNull().unique(),
    provider: text("provider").default("paystack").notNull(),
    amount: text("amount").notNull(),
    currency: text("currency").default("NGN").notNull(),

    // what they bought (frozen forever)
    plan: text("plan").notNull(), // "early-pro", "lifetime"
    perksSnapshot: jsonb("perks_snapshot").notNull(),
    /*
      {
        tier: "premium",
        credits: 500,
        earlyAccess: true,
        lifetimeDiscount: 20
      }
    */

    claimStatus: presaleClaimStatusEnum("claim_status")
      .default("UNCLAIMED")
      .notNull(),

    claimedAt: timestamp("claimed_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("presale_email_idx").on(table.email),
    index("presale_claim_status_idx").on(table.claimStatus),
  ],
);

