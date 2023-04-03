import type { Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class Vorabcheck {
  readonly page: Page;
  readonly url = "/vorabcheck";
  readonly initialStep = "rechtsschutzversicherung";
  readonly nextButtonText = "Übernehmen & Weiter";
  readonly timeout = 500;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.url);
  }

  async expectHeading() {
    await expect(this.page.getByRole("heading")).toBeVisible({
      timeout: this.timeout,
    });
  }

  async select(text: string) {
    await this.page
      .getByText(text, { exact: true })
      .click({ timeout: this.timeout });
  }

  async clickNext() {
    await Promise.all([
      this.page
        .getByRole("button", { name: this.nextButtonText })
        .click({ timeout: this.timeout }),
      this.page.waitForNavigation(), // deprecated but URL for waitForURL is unknown
    ]);
  }
}