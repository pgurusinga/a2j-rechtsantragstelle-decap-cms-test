import _ from "lodash";
import {
  beratungshilfeGrundvoraussetzungen,
  beratungshilfeGrundvoraussetzungenGuards,
} from "./grundvoraussetzung/context";
import beratungshilfeGrundvoraussetzungenFlow from "./grundvoraussetzung/flow.json";
import beratungshilfeAntragFlow from "./flow.json";
import rechtsproblemFlow from "./rechtsproblem/flow.json";
import {
  beratungshilfeRechtsproblem,
  beratungshilfeRechtsproblemGuards,
} from "./rechtsproblem/context";

export const beratungshilfeAntrag = {
  cmsSlug: "form-flow-pages",
  flow: _.merge(beratungshilfeAntragFlow, {
    states: {
      grundvoraussetzungen: _.merge(
        _.cloneDeep(beratungshilfeGrundvoraussetzungenFlow),
        {
          states: {
            start: { on: { BACK: "#antragStart" } },
            beratungshilfeBeantragt: {
              on: {
                SUBMIT: {
                  target: "#rechtsproblem.start",
                  cond: "beratungshilfeBeantragtNo",
                },
              },
            },
          },
        },
      ),
      rechtsproblem: _.merge(_.cloneDeep(rechtsproblemFlow), {
        states: {
          start: {
            on: { BACK: "#grundvoraussetzungen.beratungshilfeBeantragt" },
          },
        },
      }),
    },
  }),
  guards: {
    ...beratungshilfeGrundvoraussetzungenGuards,
    ...beratungshilfeRechtsproblemGuards,
  },
  context: {
    ...beratungshilfeGrundvoraussetzungen,
    ...beratungshilfeRechtsproblem,
  },
} as const;