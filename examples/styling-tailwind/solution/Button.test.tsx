import { render, screen } from '@testing-library/react';
import { expect, it } from 'vitest';
import { Button } from './Button';

it('is a primary button of type button by default', () => {
  render(<Button>Weiter</Button>);
  const button = screen.getByRole('button', { name: 'Weiter' });
  expect(button).toHaveAttribute('type', 'button');
  expect(button).toHaveClass('bg-blue-700');
});

it('appends custom classes to the variant', () => {
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
