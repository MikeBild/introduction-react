import { expect, test } from '@playwright/test';

test('gibt eine Bestellung auf und zeigt die Bestellnummer', async ({
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

  // Assert: expect wartet, bis die Antwort der API im DOM steht.
  // Die Nummer vergibt der Server, deshalb ein Muster statt eines festen Werts.
  const status = page.getByRole('status');
  await expect(status).toHaveText(/^Bestellung o\d+ ist eingegangen$/);

  // Die Bestellung liegt wirklich auf dem Server: Die API kennt sie unter ihrer Nummer.
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

test('hält die Bestellung bei einer ungültigen Menge auf', async ({ page }) => {
  // Arrange: Jeder Request an die API landet in dieser Liste.
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

  // Assert: Die Meldung hängt am Feld, es gibt keine Bestellnummer und keinen Request.
  await expect(quantity).toHaveAccessibleDescription(
    'Bitte eine ganze Zahl ab 1'
  );
  await expect(quantity).toHaveAttribute('aria-invalid', 'true');
  await expect(page.getByRole('status')).toHaveCount(0);
  await expect(page.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
  expect(apiRequests).toEqual([]);
});

// Ein Fehler, den nur die echte API kennt: Der Bestand steht auf dem Server.
test('zeigt einen Bestandsfehler vom Server an der Position', async ({
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
