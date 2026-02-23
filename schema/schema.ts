import { z } from "zod";

export const EmailFormSchema = z.object({
  email: z.string().email(),
});

export type EmailFormSchemaType = z.infer<typeof EmailFormSchema>;
