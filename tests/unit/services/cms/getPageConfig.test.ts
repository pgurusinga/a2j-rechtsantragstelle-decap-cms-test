import { getPageConfig } from "~/services/cms/getPageConfig";
import type { Locale } from "~/services/cms/models/Locale";

var data = {
  attributes: {},
};

const mockObject = {
  getPageFromCollection: jest.fn(
    (collection: string, pageName: string, locale?: Locale) => data.attributes
  ),
};

jest.mock("~/services/cms/index.tsx", () => () => mockObject);

beforeEach(() => {
  data = {
    attributes: {
      id: 1,
      value: "this is a test",
    },
  };
});

it("should return the right attributes for a slug", async () => {
  const result = await getPageConfig("http://localhost/page/test", {
    dontThrow: false,
  });

  expect(result).toEqual(data.attributes);
  expect(mockObject.getPageFromCollection).toHaveBeenCalledWith("page", "test");
});

it("should return a error if no data is available and dontThrow is true", async () => {
  expect.assertions(1);
  data.attributes = false;

  return await getPageConfig("http://localhost/test", {
    dontThrow: false,
  }).catch((e) => expect(e.message).toEqual("No page config found!"));
});

it("should not throw a error and return undefined if dontThrow is false", async () => {
  data.attributes = false;

  const result = await getPageConfig("http://localhost/test", {
    dontThrow: true,
  });

  expect(result).toBe(false);
});