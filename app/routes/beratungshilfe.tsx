import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import type { V2_MetaFunction } from "@remix-run/react";
import { useLoaderData } from "@remix-run/react";
import PageContent from "~/components/PageContent";
import { getPageConfig, slugsfromURL } from "~/services/cms/getPageConfig";

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => [
  { title: data.meta?.title },
];

export const loader: LoaderFunction = async ({ request }) => {
  const page = await getPageConfig(slugsfromURL(request.url)[0]);
  return json({
    content: page?.content,
    meta: page?.meta,
  });
};

export default function Index() {
  return <PageContent content={useLoaderData<typeof loader>().content} />;
}