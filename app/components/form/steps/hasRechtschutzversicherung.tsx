import type { StepInterface } from "../steps";
import { z } from "zod";
import { RadioGroup } from "~/components";
import { YesNoAnswer } from "../answers";

const schema = z.object({ hasRechtschutzversicherung: YesNoAnswer });

export const rechtSchutzVersicherungStep = {
  schema,
  component: () => {
    return (
      <div style={{ border: "solid black 1px", padding: "1rem" }}>
        <h3>Rechtschutzversicherung</h3>
        <p>Hast du eine Rechtsschutzversicherung?</p>

        <RadioGroup
          name={schema.keyof().Values.hasRechtschutzversicherung}
          options={[
            { label: "nein", value: YesNoAnswer.enum.no },
            { label: "ja", value: YesNoAnswer.enum.yes },
          ]}
        />
      </div>
    );
  },
};
