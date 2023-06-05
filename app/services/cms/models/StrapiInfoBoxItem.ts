import { z } from "zod";
import { StrapiButtonSchema } from "./StrapiButton";
import { HasStrapiIdSchema } from "./HasStrapiId";
import { StrapiHeadingSchema } from "./StrapiHeading";
import { StrapiImageSchema } from "./StrapiImage";

export const StrapiInfoBoxItemSchema = z
  .object({
    __component: z.literal("page.info-box-item").optional(),
    label: StrapiHeadingSchema.nullable(),
    headline: StrapiHeadingSchema.nullable(),
    image: StrapiImageSchema.optional(),
    content: z.string(),
    button: StrapiButtonSchema.nullable(),
  })
  .merge(HasStrapiIdSchema)
  .strict();

export type StrapiInfoBoxItem = z.infer<typeof StrapiInfoBoxItemSchema>;