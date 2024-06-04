import { test, expect } from "@playwright/test";

test("about page has title", async ({ page }) => {
  await page.goto("http://localhost:3000/about");

  await expect(page).toHaveTitle(/Todo App/);
});
