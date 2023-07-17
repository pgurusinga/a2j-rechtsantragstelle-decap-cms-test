import type { AxiosResponse } from "axios";
import axios from "axios";
import { config } from "~/services/env/env.server";
import type { GetStrapiEntryOpts } from ".";

const buildUrl = ({ apiId, slug, locale }: GetStrapiEntryOpts) =>
  [
    config().STRAPI_API,
    apiId,
    "?populate=deep",
    `&locale=${locale}`,
    slug ? `&filters[slug][$eq]=${slug}` : "",
  ].join("");

const unpackResponse = (response: AxiosResponse) => {
  const { data } = response.data;
  // collection type results come as an array with one item
  return Array.isArray(data) ? data[0] : data;
};

export const getStrapiEntryFromApi = async (opts: GetStrapiEntryOpts) => {
  const response = await axios.get(buildUrl(opts), {
    headers: {
      Authorization: "Bearer " + config().STRAPI_ACCESS_KEY,
    },
  });

  return unpackResponse(response);
};
