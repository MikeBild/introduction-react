import { test, expect } from "@playwright/test";

test("has page title `Moodbox`", async ({ page }) => {
  //arrange
  await page.goto("http://localhost:8081");
  //act // assert
  await expect(page).toHaveTitle("Moodbox");
});

test("should contains headline `Moodbox`", async ({ page }) => {
  //arrange
  await page.goto("http://localhost:8081");
  //act
  const sut = await page.getByTestId("headline").innerText();
  //assert
  await expect(sut).toEqual("Moodbox");
});
