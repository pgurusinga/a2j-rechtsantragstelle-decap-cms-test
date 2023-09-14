import fs from "node:fs";
import { config } from "../env/env.server";
import { configDotenv } from "dotenv";

const allowedExternalLinks = [
  "https://github.com",
  "https://digitalservice.bund.de",
  "https://www.bmj.de",
  "https://strapi.io",
  "https://www.hamburg.de",
  "https://www.justiz.bremen.de",
  "https://justiz.de",
  "https://www.justiz.de",
  "https://a2j-rast-stag.dev.ds4g.net",
  "https://www.gesetze-im-internet.de",
  "https://www.schlichtungsstelle-bgg.de",
  "https://posthog.com",
  "https://formulare.bfdi.bund.de",
];

function verifyExternalLinks() {
  configDotenv();
  const { CONTENT_FILE_PATH } = config();
  const content = fs.readFileSync(CONTENT_FILE_PATH, "utf-8");

  const urlRegex =
    /((https?):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
  const linksFromContent = content.match(urlRegex);

  if (linksFromContent) {
    for (const link of linksFromContent) {
      const rejectedUrl = !allowedExternalLinks.some((allowedLinks) =>
        link.includes(allowedLinks),
      );
      if (rejectedUrl)
        throw Error(
          `${link} is not allowed. Please verify the URL and add to the allowed list`,
        );
    }
  }
}

if (process.argv[2] === "verifyExternalLinks") verifyExternalLinks();
