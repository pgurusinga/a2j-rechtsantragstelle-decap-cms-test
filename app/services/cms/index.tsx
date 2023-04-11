import config from "../config";
import type { Locale } from "./models/Locale";
import Strapi from "./strapi";

export interface CMS {
  getPage(pageName: string, locale?: Locale): Promise<any>;
  getPageFromCollection(
    collection: string,
    pageName: string,
    locale?: Locale
  ): Promise<any>;
  getImageLocation(imagePath: string): string;
}

export default function getCMS(): CMS {
  switch (config().CMS) {
    // switch here in the future between STRAPI and FILE
    default:
      return new Strapi();
  }

  throw new Error(`CMS not supported:${config().CMS}`);
}
