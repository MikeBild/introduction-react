import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('shows each customer as an article with a heading', () => {
  render(<App />);
  expect(screen.getAllByRole('article')).toHaveLength(2);
  expect(
    screen.getByRole('heading', { name: /Ada Schmidt/ })
  ).toBeInTheDocument();
});

it('shows the number of results in the product search template', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'schlüssel');
  expect(screen.getByText('2 Treffer')).toBeInTheDocument();
});
