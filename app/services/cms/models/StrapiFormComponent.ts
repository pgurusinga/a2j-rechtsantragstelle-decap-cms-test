import { z } from "zod";
import { StrapiInputSchema } from "./StrapiInput";
import { StrapiSelectSchema } from "./StrapiSelect";
import { StrapiDropdownSchema } from "./StrapiDropdown";
import { StrapiTextareaSchema } from "./StrapiTextarea";
import { StrapiCheckboxSchema } from "./StrapiCheckbox";
import { StrapiTileGroupSchema } from "./StrapiTileGroup";
import { StrapiDateInputSchema } from "~/services/cms/models/StrapiDateInput";

export const StrapiFormComponentSchema = z.discriminatedUnion("__component", [
  StrapiInputSchema.required({ __component: true }),
  StrapiDateInputSchema.required({ __component: true }),
  StrapiTextareaSchema.required({ __component: true }),
  StrapiSelectSchema.required({ __component: true }),
  StrapiDropdownSchema.required({ __component: true }),
  StrapiCheckboxSchema.required({ __component: true }),
  StrapiTileGroupSchema.required({ __component: true }),
]);
