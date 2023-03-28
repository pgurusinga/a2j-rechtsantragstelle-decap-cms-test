import { z } from "zod";
import { RadioGroup } from "~/components";
import { defaultYesNoOptions, YesNoAnswer } from "../answers";
import type { StepComponentProps } from "~/components/form/steps";
import { getRelevantOptions } from "~/services/cms/getPageConfig";

const schema = z.object({ hasKlageEingereicht: YesNoAnswer });

export const klageEingereichtStep = {
  schema,
  component: ({ content }: StepComponentProps) => {
    const fieldName = schema.keyof().Values.hasKlageEingereicht;
    const options =
      getRelevantOptions(content, fieldName) ?? defaultYesNoOptions;
    return <RadioGroup name={fieldName} options={options} />;
  },
};