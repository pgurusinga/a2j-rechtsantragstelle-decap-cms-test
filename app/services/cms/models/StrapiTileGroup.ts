import { z } from "zod";
import { HasOptionalStrapiIdSchema, HasStrapiIdSchema } from "./HasStrapiId";
import { StrapiErrorCategorySchema } from "./StrapiErrorCategory";
import { omitNull } from "~/util/omitNull";
import { StrapiTileSchema } from "./StrapiTile";
import { TileGroupPropsSchema } from "~/components/inputs/TileGroup";

export const StrapiTileGroupSchema = z
  .object({
    __component: z.literal("form-elements.tile-group").optional(),
    name: z.string(),
    label: z.string().nullable(),
    altLabel: z.string().nullable(),
    options: z.array(StrapiTileSchema),
    errors: z.object({
      data: z
        .array(
          HasStrapiIdSchema.extend({
            attributes: StrapiErrorCategorySchema,
          }),
        )
        .optional(),
    }),
  })
  .merge(HasOptionalStrapiIdSchema);

type StrapiTileGroup = z.infer<typeof StrapiTileGroupSchema>;

export const getTileGroupProps = (cmsData: StrapiTileGroup) => {
  const errorMessages = cmsData.errors.data?.flatMap(
    (cmsError) => cmsError.attributes.errorCodes,
  );
  return TileGroupPropsSchema.parse(omitNull({ ...cmsData, errorMessages }));
};
