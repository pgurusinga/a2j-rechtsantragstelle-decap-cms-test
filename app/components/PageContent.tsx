import { Input, Stack } from "~/components";
import Heading from "~/components/Heading";
import Paragraph from "~/components/Paragraph";

type PageContentProps = {
  content: any[];
};

const EmptyComponent = () => <></>;

const mapping: { [name: string]: any } = {
  "basic.header": Heading,
  "basic.paragraph": Paragraph,
  "basic.input": Input,
};

const PageContent = ({ content }: PageContentProps) => {
  return (
    <Stack space="l">
      {content?.map((component: any, index: number) => {
        const Component = mapping[component.__component] || EmptyComponent;
        return <Component key={`${index}`} {...component} />;
      })}
    </Stack>
  );
};

export default PageContent;
