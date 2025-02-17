import { z } from "zod";
import { StrapiHeadingSchema } from "./StrapiHeading";
import { StrapiBoxWithImageSchema } from "./StrapiBoxWithImage";
import { StrapiParagraphSchema } from "./StrapiParagraph";
import { StrapiInfoBoxSchema } from "./StrapiInfoBox";
import { StrapiBoxSchema } from "./StrapiBox";
import { StrapiHeaderSchema } from "./StrapiHeader";
import { StrapiInputSchema } from "./StrapiInput";
import { StrapiInfoBoxItemSchema } from "./StrapiInfoBoxItem";
import { StrapiSelectSchema } from "./StrapiSelect";
import { StrapiLinkListBoxSchema } from "./StrapiLinkListBox";
import { StrapiDropdownSchema } from "./StrapiDropdown";
import { StrapiTextareaSchema } from "./StrapiTextarea";
import { StrapiListSchema } from "./StrapiList";
import { StrapiListItemSchema } from "./StrapiListItem";
import { StrapiCheckboxSchema } from "./StrapiCheckbox";
import { StrapiTileGroupSchema } from "./StrapiTileGroup";
import { StrapiDateInputSchema } from "~/services/cms/models/StrapiDateInput";

export const StrapiContentSchema = z.discriminatedUnion("__component", [
  StrapiBoxSchema.required({ __component: true }),
  StrapiBoxWithImageSchema.required({ __component: true }),
  StrapiHeaderSchema.required({ __component: true }),
  StrapiCheckboxSchema.required({ __component: true }),
  StrapiHeadingSchema.required({ __component: true }),
  StrapiInfoBoxSchema.required({ __component: true }),
  StrapiInfoBoxItemSchema.required({ __component: true }),
  StrapiParagraphSchema.required({ __component: true }),
  StrapiInputSchema.required({ __component: true }),
  StrapiTextareaSchema.required({ __component: true }),
  StrapiSelectSchema.required({ __component: true }),
  StrapiLinkListBoxSchema.required({ __component: true }),
  StrapiDropdownSchema.required({ __component: true }),
  StrapiListSchema.required({ __component: true }),
  StrapiListItemSchema.required({ __component: true }),
  StrapiTileGroupSchema.required({ __component: true }),
  StrapiDateInputSchema.required({ __component: true }),
]);

export type StrapiContent = z.infer<typeof StrapiContentSchema>;
