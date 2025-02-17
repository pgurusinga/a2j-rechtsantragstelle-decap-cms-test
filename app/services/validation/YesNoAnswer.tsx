import { z } from "zod";
import type { ZodErrorMap } from "zod/lib/ZodError";

export const customRequiredErrorMessage: { errorMap: ZodErrorMap } = {
  errorMap: (issue, ctx) => ({ message: "required" }),
};
export const YesNoAnswer = z.enum(["yes", "no"], customRequiredErrorMessage);
