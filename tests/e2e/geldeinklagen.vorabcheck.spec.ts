import { test, expect } from "@playwright/test";
import { expectPageToBeAccessible } from "./util/expectPageToBeAccessible";
import { GeldEinklagen } from "./pom/GeldEinklagen";

let geldEinklagen: GeldEinklagen;

test.beforeEach(async ({ page }) => {
  geldEinklagen = new GeldEinklagen(page);
  await geldEinklagen.goto();
});

test("forwarded to intial step", async ({ page }) => {
  await expect(page).toHaveURL(
    `${geldEinklagen.url}/${geldEinklagen.initialStep}`
  );
});

test("geldeinklagen can be traversed", async ({ page }) => {
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("kontaktaufnahme", "no");

  // warning step kontaktaufname-hinweis
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("fristAbgelaufen", "notSet");

  // warning step frist-abgelaufen-hinweis
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("verjaehrt", "yes");

  // warning step verjaehrt-hinweis
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("beweise", "no");

  // warning step beweise-hinweis
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("gerichtsentscheidung", "yes");

  // warning step gerichtsentscheidung-hinweis
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("verfahrenBegonnen", "yes");

  // warning step verfahren-begonnen-hinweis
  await expectPageToBeAccessible({ page });
  await geldEinklagen.clickNext();

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("privatperson", "yes");

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("wohnsitzDeutschland", "yes");

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("forderung", "lessOrEqual5000");

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("bereich", "travel");

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("flug", "no");

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("gegenseite", "unternehmen");

  await expectPageToBeAccessible({ page });
  await geldEinklagen.fillRadioPage("gegenseiteUnternehmenDeutschland", "yes");

  await expectPageToBeAccessible({ page });
  await expect(
    page
      .getByRole("heading")
      .filter({ hasText: "Finden Sie jetzt Ihr Amtsgericht" })
  ).toHaveCount(1);
});

test("funnel: invalid step redirects to start", async ({ page }) => {
  await page.goto(`${geldEinklagen.url}/stepDoesNotExist`);
  await expect(page).toHaveURL(
    `${geldEinklagen.url}/${geldEinklagen.initialStep}`
  );
});