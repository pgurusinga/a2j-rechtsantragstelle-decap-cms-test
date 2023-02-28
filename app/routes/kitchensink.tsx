import { Input, Select, Stack } from "~/components";
import { json } from "@remix-run/node";
import type { DataFunctionArgs } from "@remix-run/node";

import { z } from "zod";
import { withZod } from "@remix-validated-form/with-zod";
import { ValidatedForm, validationError } from "remix-validated-form";

import { useActionData } from "@remix-run/react";

export const DummySchema = z.object({
  text: z.string().min(1),
  options: z.enum(["1", "2", "3"]),
});

const validator = withZod(DummySchema);

export const action = async ({ request }: DataFunctionArgs) => {
  const data = await validator.validate(await request.formData());
  if (data.error) return validationError(data.error);
  return json(data.data);
};

export default function Kitchensink() {
  const data = useActionData();
  return (
    <div className="block p-6 rounded-lg shadow-lg max-w-xl">
      <h1>Kitchensink</h1>

      <h2>Form</h2>

      <ValidatedForm
        validator={validator}
        method="post"
        className="my-6"
        defaultValues={{
          text: "hello",
        }}
      >
        <Stack space="xl">
          <Stack space="l">
            <Input name="text" label="Text" />
            <Select
              name="options"
              label="Option"
              options={[
                { text: "bitte auswählen", value: "" },
                { text: "Option 1", value: "1" },
                { text: "Option 2", value: "2" },
                { text: "Option 3", value: "3" },
              ]}
            />
          </Stack>
          <div>
            <button type="submit">Abschicken</button>
          </div>{" "}
        </Stack>
      </ValidatedForm>

      {data && (
        <pre className="p-5 bg-gray-200 rounded-md">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
