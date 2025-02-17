import { z } from "zod";
import {
  customRequiredErrorMessage,
  YesNoAnswer,
} from "~/services/validation/YesNoAnswer";
import { buildKidsCountValidationSchema } from "~/services/validation/kidsCount/buildKidsCountValidationSchema";
import { buildMoneyValidationSchema } from "~/services/validation/money/buildMoneyValidationSchema";

export const kidsSchema = z
  .object({
    kids6Below: buildKidsCountValidationSchema(),
    kids7To14: buildKidsCountValidationSchema(),
    kids15To18: buildKidsCountValidationSchema(),
    kids18Above: buildKidsCountValidationSchema(),
  })
  .superRefine((schema, ctx) => {
    const fieldnames = [
      "kids6Below",
      "kids7To14",
      "kids15To18",
      "kids18Above",
    ] as const;

    if (
      !fieldnames
        .map((fieldname) => schema[fieldname])
        .some((field) => field != "0" && field != undefined)
    ) {
      fieldnames.forEach((fieldname) => {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "fill_one",
          path: [fieldname],
        });
      });
    }
  });

export const context = {
  rechtsschutzversicherung: YesNoAnswer,
  klageEingereicht: YesNoAnswer,
  hamburgOderBremen: YesNoAnswer,
  beratungshilfeBeantragt: YesNoAnswer,
  eigeninitiative: YesNoAnswer,
  wurdeVerklagt: YesNoAnswer,
  staatlicheLeistungen: z.enum(
    [
      "grundsicherung",
      "asylbewerberleistungen",
      "buergergeld",
      "andereLeistung",
      "keine",
    ],
    customRequiredErrorMessage,
  ),
  erwerbstaetigkeit: YesNoAnswer,
  vermoegen: z.enum(["below_10k", "above_10k"], customRequiredErrorMessage),
  genauigkeit: YesNoAnswer,
  partnerschaft: YesNoAnswer,
  einkommenPartner: buildMoneyValidationSchema(),
  kinder: YesNoAnswer,
  kinderKurz: YesNoAnswer,
  kids: kidsSchema,
  kinderAnzahlKurz: buildKidsCountValidationSchema(),
  einkommenKinder: buildMoneyValidationSchema(),
  unterhalt: YesNoAnswer,
  unterhaltSumme: buildMoneyValidationSchema(),
  einkommen: buildMoneyValidationSchema(),
  verfuegbaresEinkommen: YesNoAnswer,
  miete: buildMoneyValidationSchema(),
  weitereZahlungenSumme: buildMoneyValidationSchema(),
} as const;

const contextObject = z.object(context).partial();
export type BeratungshilfeVorabcheckContext = z.infer<typeof contextObject>;
