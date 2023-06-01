import type { StepInterface } from "~/components/form/steps";
import { Steps } from "~/components/form/steps";
import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { einkommenKinderStep } from "~/components/form/steps/einkommenKinder";
import { kinderAnzahlSimpleStep } from "~/components/form/steps/kinderAnzahlSimple";
import { verfuegbaresEinkommenStep } from "~/components/form/steps/verfuegbaresEinkommen";

export const formPages: Record<string, StepInterface> = {
  rechtsschutzversicherung: Steps.rechtsschutzversicherungStep,
  rechtsschutzversicherungError: Steps.exitRechtsschutzversicherungStep,
  klageEingereicht: Steps.klageEingereichtStep,
  klageEingereichtError: Steps.exitKlageEingereicht,
  hamburgOderBremen: Steps.hamburgOderBremenStep,
  hamburgOderBremenError: Steps.emptyStep,
  beratungshilfeBeantragt: Steps.beratungshilfeBeantragtStep,
  beratungshilfeBeantragtError: Steps.emptyStep,
  eigeninitiative: Steps.eigeninitiativeStep,
  eigeninitiativeWarnung: Steps.emptyStep,
  kostenfreieBeratung: Steps.kostenfreieBeratungStep,
  kostenfreieBeratungWarnung: Steps.emptyStep,
  wurdeVerklagt: Steps.wurdeVerklagtStep,
  staatlicheLeistungen: Steps.staatlicheLeistungenStep,
  vermoegen: Steps.vermoegenStep,
  vermoegenError: Steps.emptyStep,
  genauigkeit: Steps.genauigkeitStep,
  partnerschaft: Steps.partnerschaftStep,
  einkommenPartner: Steps.einkommenPartnerStep,
  kinder: Steps.kinderStep,
  kinderAnzahl: Steps.kinderAnzahlStep,
  kinderKurz: Steps.kinderStep,
  kinderAnzahlKurz: kinderAnzahlSimpleStep,
  einkommenKinder: einkommenKinderStep,
  unterhalt: Steps.unterhaltStep,
  unterhaltSumme: Steps.unterhaltSummeStep,
  erwerbstaetigkeit: Steps.erwerbstaetigkeitStep,
  einkommen: Steps.einkommenStep,
  verfuegbaresEinkommen: verfuegbaresEinkommenStep,
  miete: Steps.mieteStep,
  weitereZahlungen: Steps.weitereZahlungenStep,
  weitereZahlungenSumme: Steps.weitereZahlungenSummeStep,
  abschlussNein: Steps.abschlussNeinStep,
  abschlussVielleicht: Steps.abschlussVielleichtStep,
  abschlussJa: Steps.abschlussJaStep,
} as const;

export const allValidators = Object.fromEntries(
  Object.entries(formPages).map(([key, step]) => [
    key,
    "schema" in step ? withZod(step.schema) : withZod(z.object({})),
  ])
) as Record<string, ReturnType<typeof withZod>>;
