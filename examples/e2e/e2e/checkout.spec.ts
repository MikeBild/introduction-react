import { expect, test } from '@playwright/test';

// Example: Playwright finds elements like Testing Library does – by role and label.
// Every expect(locator) waits until the condition holds or the timeout expires.
test('shows the checkout with customer, quantities and button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  await expect(page.getByLabel('Kunde')).toHaveValue('');
  await expect(
    page.getByRole('textbox', { name: 'Menge Drehmomentschlüssel' })
  ).toHaveValue('1');
  await expect(page.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});

// Exercise react-e2e-playwright: remove .skip and write the two tests.
test.skip('places an order and shows the order number', async ({
  page,
}) => {
  // Happy path: choose a customer, set a quantity, order, check the order number in the status role.
  await page.goto('/');
});

test.skip('stops the order on an invalid quantity', async ({
  page,
}) => {
  // Error path: quantity 0, order, check the message at the field, no order number.
  await page.goto('/');
});
