import { z } from "zod";
import { HasStrapiIdSchema } from "./HasStrapiId";

export const StrapiImageSchema = z.object({
  data: z
    .object({
      attributes: z
        .object({
          name: z.string(),
          url: z.string().url(),
          previewUrl: z.string().url().nullable(),
          width: z.number(),
          height: z.number(),
          size: z.number(),
          alternativeText: z.string().nullable(),
          ext: z.string().startsWith("."),
          mime: z.string().startsWith("image/"),
          caption: z.string().nullable(),
          formats: z.string().nullable(),
          hash: z.string(),
          provider: z.string(),
          provider_metadata: z.string().nullable(),
          createdAt: z.string().datetime({ precision: 3 }),
          updatedAt: z.string().datetime({ precision: 3 }),
        })
        .strict(),
    })
    .merge(HasStrapiIdSchema)
    .strict()
    .nullable(),
});

export type StrapiImage = z.infer<typeof StrapiImageSchema>;