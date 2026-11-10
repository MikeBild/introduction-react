import { expect, test } from '@playwright/test';

test('places an order and shows the order number', async ({
  page,
  request,
}) => {
  // Arrange
  await page.goto('/');

  // Act
  await page.getByLabel('Kunde').selectOption({ label: 'Ada Schmidt' });
  await page
    .getByRole('textbox', { name: 'Menge Drehmomentschlüssel' })
    .fill('2');
  await page.getByRole('button', { name: 'Bestellen' }).click();

  // Assert: expect waits until the API response is in the DOM.
  // The server assigns the number, hence a pattern instead of a fixed value.
  const status = page.getByRole('status');
  await expect(status).toHaveText(/^Bestellung o\d+ ist eingegangen$/);

  // The order really is on the server: the API knows it by its number.
  const [id] = (await status.innerText()).match(/o\d+/) ?? [];
  const response = await request.get(`/api/orders/${id}`);
  expect(response.status()).toBe(200);
  expect(await response.json()).toMatchObject({
    customerId: 'c1',
    status: 'placed',
    items: [
      { productId: 'p1', quantity: 2, priceCents: 8990 },
      { productId: 'p4', quantity: 2, priceCents: 1990 },
    ],
  });
});

test('stops the order on an invalid quantity', async ({ page }) => {
  // Arrange: every request to the API ends up in this list.
  const apiRequests: string[] = [];
  page.on('request', (request) => {
    if (request.url().includes('/api/')) apiRequests.push(request.url());
  });
  await page.goto('/');

  // Act
  await page.getByLabel('Kunde').selectOption({ label: 'Ada Schmidt' });
  const quantity = page.getByRole('textbox', {
    name: 'Menge Drehmomentschlüssel',
  });
  await quantity.fill('0');
  await page.getByRole('button', { name: 'Bestellen' }).click();

  // Assert: the message is attached to the field, there is no order number and no request.
  await expect(quantity).toHaveAccessibleDescription(
    'Bitte eine ganze Zahl ab 1'
  );
  await expect(quantity).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('status')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
  expect(apiRequests).toEqual([]);
});

// An error that only the real API knows: the stock lives on the server.
test('shows a stock error from the server at the item', async ({
  page,
}) => {
  await page.goto('/');
  await page.getByLabel('Kunde').selectOption({ label: 'Ada Schmidt' });
  const quantity = page.getByRole('textbox', {
    name: 'Menge Drehmomentschlüssel',
  });
  await quantity.fill('5');
  await page.getByRole('button', { name: 'Bestellen' }).click();

  await expect(quantity).toHaveAccessibleDescription('Nur 4 auf Lager');
  await expect(page.getByRole('status')).toHaveCount(0);
});
