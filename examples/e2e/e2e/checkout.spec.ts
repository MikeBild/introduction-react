import { expect, test } from '@playwright/test';

// Beispiel: Playwright findet Elemente wie Testing Library – über Rolle und Label.
// Jedes expect(locator) wartet, bis die Bedingung stimmt oder das Timeout abläuft.
test('zeigt den Checkout mit Kunde, Mengen und Button', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Checkout' })).toBeVisible();
  await expect(page.getByLabel('Kunde')).toHaveValue('');
  await expect(
    page.getByRole('textbox', { name: 'Menge Drehmomentschlüssel' })
  ).toHaveValue('1');
  await expect(page.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});

// Übung react-e2e-playwright: Entferne .skip und schreib die beiden Tests.
test.skip('gibt eine Bestellung auf und zeigt die Bestellnummer', async ({
  page,
}) => {
  // Erfolgsweg: Kunde wählen, Menge setzen, bestellen, Bestellnummer in der Rolle status prüfen.
  await page.goto('/');
});

test.skip('hält die Bestellung bei einer ungültigen Menge auf', async ({
  page,
}) => {
  // Fehlerweg: Menge 0, bestellen, Meldung am Feld prüfen, keine Bestellnummer.
  await page.goto('/');
});
