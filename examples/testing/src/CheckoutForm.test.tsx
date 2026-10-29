import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { initialCart } from './cart';
import { CheckoutForm } from './CheckoutForm';

// Beispiel: Finde Elemente so, wie Nutzer sie finden – über Rolle und Label.
it('zeigt Kunde, Mengen und den Button', () => {
  render(<CheckoutForm cart={initialCart} />);
  expect(screen.getByLabelText('Kunde')).toBeInTheDocument();
  expect(
    screen.getByRole('textbox', { name: 'Menge Drehmomentschlüssel' })
  ).toHaveValue('1');
  expect(screen.getByRole('button', { name: 'Bestellen' })).toBeEnabled();
});

// Übung react-testing: Schreib diese drei Tests.
it.todo('zeigt die Bestellnummer nach erfolgreicher Bestellung');
it.todo('zeigt den Validation Error am Feld und sendet keinen Request');
it.todo('meldet einen Server Error mit Status 500');
