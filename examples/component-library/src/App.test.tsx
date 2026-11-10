import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it } from 'vitest';
import { App } from './App';

it('shows all customers', () => {
  render(<App />);
  expect(
    screen.getByRole('heading', { name: /Ada Schmidt/ })
  ).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: 'Bearbeiten' })).toHaveLength(2);
});

it('filters products via the search field', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'schlüssel');
  expect(screen.getAllByRole('listitem')).toHaveLength(2);
});

// Exercise react-composition: remove .skip
it.skip('shows each customer as an article with a heading', () => {
  render(<App />);
  expect(screen.getAllByRole('article')).toHaveLength(2);
});

// Exercise react-atomic-design: remove .skip
it.skip('shows the number of results in the product search template', async () => {
  render(<App />);
  await userEvent.type(screen.getByLabelText('Produkt suchen'), 'schlüssel');
  expect(screen.getByText('2 Treffer')).toBeInTheDocument();
});
