import { z } from "zod";
import { StrapiElementWithIdSchema } from "./StrapiElementWithId";
import { StrapiContentSchema } from "./StrapiContent";
import { HasOptionalStrapiIdSchema, HasStrapiIdSchema } from "./HasStrapiId";
import { HasStrapiLocaleSchema } from "./HasStrapiLocale";
import { HasStrapiMetaSchema } from "./HasStrapiMeta";
import { HasStrapiSlugSchema } from "./HasStrapiSlug";
import { HasStrapiTimestampsSchema } from "./HasStrapiTimestamps";
import { StrapiHeadingSchema } from "./StrapiHeading";
import { StrapiLinkSchema } from "./StrapiLink";
import { StrapiParagraphSchema } from "./StrapiParagraph";
import { StrapiResultPageTypeSchema } from "./StrapiResultPageType";

export const StrapiResultPageSchema = z
  .object({
    pageType: StrapiResultPageTypeSchema,
    heading: StrapiHeadingSchema,
    hintText: StrapiParagraphSchema.nullable(),
    linkText: z.string().nullable(),
    backLinkInHeader: z.boolean().nullable(),
    reasonings: z.object({
      data: z
        .array(
          HasStrapiIdSchema.extend({
            attributes: StrapiElementWithIdSchema,
          }),
        )
        .nullable(),
    }),
    documents: z.object({
      data: HasStrapiIdSchema.extend({
        attributes: StrapiElementWithIdSchema,
      }).nullable(),
    }),
    nextSteps: z.object({
      data: HasStrapiIdSchema.extend({
        attributes: StrapiElementWithIdSchema,
      }).nullable(),
    }),
    freeZone: z.array(StrapiContentSchema),
    nextLink: StrapiLinkSchema.nullable(),
  })
  .merge(HasOptionalStrapiIdSchema)
  .merge(HasStrapiLocaleSchema)
  .merge(HasStrapiMetaSchema)
  .merge(HasStrapiSlugSchema)
  .merge(HasStrapiTimestampsSchema);
