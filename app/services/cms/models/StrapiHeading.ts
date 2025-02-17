import { z } from "zod";
import { HasOptionalStrapiIdSchema } from "./HasStrapiId";
import { HeadingPropsSchema } from "~/components/Heading";
import { omitNull } from "~/util/omitNull";

export const StrapiHeadingSchema = z
  .object({
    __component: z.literal("basic.heading").optional(),
    text: z.string(),
    tagName: z.enum(["h1", "h2", "h3", "h4", "h5", "h6", "p", "div"]),
    look: z.enum([
      "default",
      "ds-heading-01-reg",
      "ds-heading-02-reg",
      "ds-heading-03-reg",
      "ds-heading-03-bold",
      "ds-subhead",
      "ds-label-01-reg",
      "ds-label-01-bold",
      "ds-label-02-reg",
      "ds-label-02-bold",
      "ds-label-03-reg",
      "ds-label-03-bold",
      "ds-label-section",
      "ds-body-01-reg",
      "ds-body-02-reg",
    ]),
  })
  .merge(HasOptionalStrapiIdSchema);

export type StrapiHeading = z.infer<typeof StrapiHeadingSchema>;

export const getHeadingProps = (cmsData: StrapiHeading) => {
  return HeadingPropsSchema.parse(omitNull(cmsData));
};
