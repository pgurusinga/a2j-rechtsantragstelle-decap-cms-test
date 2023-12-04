import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { readFileSync } from "fs";

import Container from "~/components/Container";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const slug = "2023-12-04-first-blog-article";
  // const [attributes, PostContent] = await Promise.all([
  //   import(`/app/content/blog/${slug}.md`).then((mod) => mod.attributes),
  //   import(`/app/content/blog/${slug}.md`).then((mod) => mod.default),
  // ]);
  const file = readFileSync(`app/content/blog/${slug}.md`); // sync for testing only
  console.log({ file: file.toString() });

  // parse md
  // zod-matter

  return json({});
};

export default function Index() {
  const { attributes, filename } = useLoaderData<typeof Loader>();
  return (
    <Container>
      <pre>{JSON.stringify({ attributes, filename }, null, 2)}</pre>
      <img src={`${attributes.thumbnail}`} width="200" />
      <PostContent />
    </Container>
  );
}
