import type { AllowedIDs, Context, FormFlow } from "./vorabcheck";
import Graph from "graphology";
import { allSimplePaths } from "graphology-simple-path";

export function makeFormGraph(formFlow: FormFlow) {
  const formGraph = new Graph({
    multi: false,
    allowSelfLoops: false,
    type: "directed",
  });

  Object.entries(formFlow).forEach(([key, val]) => {
    typeof val === "string"
      ? formGraph.mergeEdge(key, val)
      : val.forEach((element) =>
          typeof element === "string"
            ? formGraph.mergeEdge(key, element)
            : formGraph.mergeEdge(key, element.destination, {
                condition: element.condition,
              })
        );
  });
  return formGraph;
}

export function longestPath(start: AllowedIDs, stop: AllowedIDs, graph: Graph) {
  return allSimplePaths(graph, start, stop).reduce(
    (acc, path) => (acc > path.length ? acc : path.length),
    0
  );
}

export function isLeaf(nodeID: AllowedIDs, formGraph: Graph): boolean {
  return formGraph.outDegree(nodeID) === 0;
}

export function findPreviousStep(
  nodeID: AllowedIDs,
  formGraph: Graph,
  context: Context
): AllowedIDs[] {
  const validPredecessors: AllowedIDs[] = [];
  for (const link of formGraph.inEdgeEntries(nodeID)) {
    if (
      !link.attributes["condition"] ||
      link.attributes["condition"](context)
    ) {
      validPredecessors.push(link.source as AllowedIDs);
    }
  }
  return validPredecessors;
}
