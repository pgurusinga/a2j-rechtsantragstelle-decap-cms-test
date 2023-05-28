import { z } from "zod";
import { ImageSchema } from "./Image";
import { LinkSchema } from "./Link";
import { ParagraphSchema } from "./Paragraph";
import { HasIdSchema } from "./HasId";
import { HasLocaleSchema } from "./HasLocale";
import { HasTimestampsSchema } from "./HasTimestamps";

export const FooterSchema = z
  .object({
    image: ImageSchema,
    paragraphs: z.array(ParagraphSchema),
    links: z.array(LinkSchema),
  })
  .merge(HasIdSchema)
  .merge(HasLocaleSchema)
  .merge(HasTimestampsSchema)
  .strict();

export type Footer = z.infer<typeof FooterSchema>;