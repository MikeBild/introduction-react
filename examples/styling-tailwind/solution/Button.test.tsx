import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Button } from './Button';

it('ist standardmäßig ein primary Button vom Typ button', () => {
  render(<Button>Weiter</Button>);
  const button = screen.getByRole('button', { name: 'Weiter' });
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass('bg-blue-700');
});

it('hängt eigene Klassen an die Variant an', () => {
  render(
    <Button variant="danger" className="w-full">
      Löschen
    </Button>
  );
  expect(screen.getByRole('button', { name: 'Löschen' })).toHaveClass(
    'bg-red-700',
    'w-full'
  );
});
