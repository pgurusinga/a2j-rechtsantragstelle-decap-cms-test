import flow from "./config.json";
import { context } from "./pages";
import { guards } from "./guards";
import { type AllContexts } from "../common";
import { getGerichtskostenvorschuss } from "~/models/geldEinklagen";

export const geldEinklagenVorabcheck = {
  cmsSlug: "vorab-check-pages",
  stringReplacements: (context: AllContexts) => ({
    gerichtskostenvorschuss: getGerichtskostenvorschuss(context).toString(),
  }),
  flow,
  guards,
  context,
} as const;
