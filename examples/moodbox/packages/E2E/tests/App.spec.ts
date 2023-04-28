import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  //arrange
  await page.goto("http://localhost:5173");
  //act // assert
  await expect(page).toHaveTitle("Moodbox");
});

test("get started link", async ({ page }) => {
  //arrange
  await page.goto("http://localhost:5173");
  //act
  const sut = await page.getByTestId("headline").innerText();
  //assert
  await expect(sut).toEqual("Moodbox");
});
