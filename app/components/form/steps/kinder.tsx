import { z } from "zod";
import { YesNoAnswer, yesNoRadioGroup } from "../answers";
import type { StepComponentProps } from "~/components/form/steps";

const schema = z.object({ isPayingForKids: YesNoAnswer });

export const kinderStep = {
  schema,
  component: ({ content }: StepComponentProps) =>
    yesNoRadioGroup(content, schema),
};