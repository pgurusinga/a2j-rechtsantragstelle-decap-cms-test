import { z } from "zod";
import { StrapiImageSchema, getImageProps } from "./StrapiImage";
import { StrapiLinkSchema } from "./StrapiLink";
import { StrapiParagraphSchema, getRichTextProps } from "./StrapiParagraph";
import { HasOptionalStrapiIdSchema } from "./HasStrapiId";
import { HasStrapiLocaleSchema } from "./HasStrapiLocale";
import { HasStrapiTimestampsSchema } from "./HasStrapiTimestamps";
import { FooterPropsSchema } from "~/components/Footer";
import { omitNull } from "~/util/omitNull";

export const StrapiFooterSchema = z
  .object({
    image: StrapiImageSchema.nullable().optional(),
    paragraphs: z.array(StrapiParagraphSchema).nullable(),
    links: z.array(StrapiLinkSchema).nullable(),
  })
  .merge(HasOptionalStrapiIdSchema)
  .merge(HasStrapiLocaleSchema)
  .merge(HasStrapiTimestampsSchema);

export type StrapiFooter = z.infer<typeof StrapiFooterSchema>;

export const getFooterProps = (cmsData: StrapiFooter) => {
  const paragraphs = cmsData.paragraphs?.map((p) => getRichTextProps(p));
  const image = getImageProps(cmsData.image);
  return FooterPropsSchema.parse(omitNull({ ...cmsData, paragraphs, image }));
};
