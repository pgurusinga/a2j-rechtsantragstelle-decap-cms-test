import { useLoaderData, useParams } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import type {
  ActionFunction,
  LoaderFunction,
  V2_MetaFunction,
} from "@remix-run/node";
import { ValidatedForm, validationError } from "remix-validated-form";
import { formPages, allValidators } from "~/lib/vorabcheck/pages";
import type { AllowedIDs } from "~/lib/vorabcheck/pages";
import {
  initialStepID,
  progress,
  formGraph,
} from "~/lib/vorabcheck/flow.server";
import { ButtonNavigation } from "~/components/form/ButtonNavigation";
import { commitSession, getSession } from "~/sessions";
import {
  findPreviousStep,
  isLeaf,
  isValidContext,
} from "~/lib/treeCalculations";
import {
  getResultPageConfig,
  getVorabCheckPageConfig,
} from "~/services/cms/getPageConfig";
import PageContent from "~/components/PageContent";
import { ProgressBar } from "~/components/form/ProgressBar";
import Container from "~/components/Container";
import type { VorabcheckPage } from "~/services/cms/models/VorabcheckPage";
import type { ResultPage as ResultPageContent } from "~/services/cms/models/ResultPage";
import ResultPage from "~/components/ResultPage";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  { title: data.meta?.title },
];

export const loader: LoaderFunction = async ({ params, request }) => {
  const stepID = params.stepID as AllowedIDs;
  if (!formGraph.hasNode(stepID)) {
    return redirect(`/vorabcheck/${initialStepID}`);
  }

  const currentPage = formPages[stepID];
  let formPageContent: VorabcheckPage | undefined;
  let resultPageContent: ResultPageContent | undefined;
  if ("schema" in currentPage) {
    formPageContent = await getVorabCheckPageConfig(request.url);
  } else {
    resultPageContent = await getResultPageConfig(request.url);
  }
  const session = await getSession(request.headers.get("Cookie"));

  if (!isValidContext(initialStepID, stepID, formGraph, session.data)) {
    return redirect(`/vorabcheck/${initialStepID}`);
  }

  let additionalContext = {};
  if ("additionalContext" in currentPage) {
    for (const requestedContext of currentPage["additionalContext"]) {
      // Use .find(), since answers are nested below stepID and there is no fast lookup by name alone
      additionalContext = {
        ...additionalContext,
        ...Object.values(session.data).find((el) => requestedContext in el),
      };
    }
  }

  return json({
    defaultValues: session.data[stepID],
    preFormContent: formPageContent?.pre_form,
    formContent: formPageContent?.form,
    resultContent: resultPageContent,
    meta: formPageContent?.meta || resultPageContent?.meta,
    progressStep: progress[stepID],
    progressTotal: progress[initialStepID],
    isLast: isLeaf(stepID, formGraph),
    previousStep: findPreviousStep(stepID, formGraph, session.data)[0],
    additionalContext,
  });
};

export const action: ActionFunction = async ({ params, request }) => {
  const session = await getSession(request.headers.get("Cookie"));
  const formData = await request.formData();
  const stepID = params.stepID as AllowedIDs;
  const validationResult = await allValidators[stepID].validate(formData);
  if (validationResult.error) return validationError(validationResult.error);
  session.set(stepID, validationResult.data);

  // Deciding the next step
  // 1. Default: back to initial
  let destinationString: AllowedIDs = initialStepID;
  for (const link of formGraph.outEdgeEntries(stepID)) {
    // 2. For each outgoing link: check if theres a condition and whether its fullfilled
    if (
      !link.attributes["condition"] ||
      link.attributes["condition"](session.data)
    ) {
      destinationString = link.target as AllowedIDs;
      break;
    }
  }
  const headers = { "Set-Cookie": await commitSession(session) };
  return redirect(`/vorabcheck/${destinationString}`, { status: 302, headers });
};

export default function Index() {
  const {
    defaultValues,
    preFormContent,
    formContent,
    resultContent,
    progressStep,
    progressTotal,
    isLast,
    previousStep,
    additionalContext,
  } = useLoaderData<typeof loader>();
  const stepProgress = progressTotal - progressStep + 1;
  const params = useParams();
  const stepID = params.stepID as AllowedIDs;
  const FormInputComponent = formPages[stepID].component;

  if (resultContent) {
    return <ResultPage content={resultContent} />;
  }
  return (
    <Container className="pt-16 pb-80 bg-blue-100 min-h-[100vh]">
      <div className="ds-stack stack-16">
        <div>
          <p className="ds-label-03-reg mb-4">Vorab-Check</p>
          <ProgressBar
            progress={stepProgress}
            max={progressTotal}
            fallback={
              isLast ? "" : `Schritt ${stepProgress} / ${progressTotal}`
            }
          />
        </div>
        <div className="ds-stack stack-32">
          <PageContent content={preFormContent} />
          <ValidatedForm
            key={`${stepID}_form`}
            method="post"
            validator={allValidators[stepID]}
            defaultValues={defaultValues}
          >
            <div className="ds-stack stack-48">
              <FormInputComponent
                content={formContent}
                additionalContext={additionalContext}
              />
              <ButtonNavigation
                backDestination={previousStep}
                isLast={isLast}
              />
            </div>
          </ValidatedForm>
        </div>
      </div>
    </Container>
  );
}
