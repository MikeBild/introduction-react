import { test, expect } from "@playwright/test";

test("get started link", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("link", { name: "About" }).click();

  await expect(page.getByRole("heading", { name: "About" })).toBeVisible();
});
