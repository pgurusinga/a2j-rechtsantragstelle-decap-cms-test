import { z } from "zod";
import { RadioGroup } from "~/components";
import { YesNoAnswer } from "../answers";

const schema = z.object({ hasKlageEingereicht: YesNoAnswer });
const varNames = schema.keyof().Values;

export const klageEingereichtStep = {
  schema,
  varNames,
  component: () => {
    return (
      <div style={{ border: "solid black 1px", padding: "1rem" }}>
        <h3>Haben Sie selbst eine Klage eingereicht?</h3>
        <RadioGroup
          name={varNames.hasKlageEingereicht}
          options={[
            { label: "nein", value: YesNoAnswer.Enum.no },
            { label: "ja", value: YesNoAnswer.Enum.yes },
          ]}
        />
      </div>
    );
  },
};
