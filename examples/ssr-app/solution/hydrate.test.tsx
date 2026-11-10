import { act } from 'react';
import { renderToString } from 'react-dom/server';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, expect, it, vi } from 'vitest';
import { App } from '../src/App';
import { loadProductPage } from '../src/productPage';
import { hydrate } from './hydrate';

afterEach(() => {
  document.body.innerHTML = '';
});

it('adopts the server HTML without a mismatch and makes the button clickable', async () => {
  const consoleError = vi.spyOn(console, 'error');
  const data = await loadProductPage();
  const container = document.createElement('div');
  container.innerHTML = renderToString(<App data={data} />);
  document.body.append(container);
  const serverHeading = screen.getByRole('heading', { level: 1 });

  const root = await act(async () => hydrate(container, data));
  await userEvent.click(
    screen.getByRole('button', { name: 'Drehmomentschlüssel in den Warenkorb' })
  );

  expect(screen.getByText('Im Warenkorb: 1')).toBeInTheDocument();
  // The same DOM element as from the server: React adopted it rather than replacing it.
  expect(screen.getByRole('heading', { level: 1 })).toBe(serverHeading);
  expect(consoleError).not.toHaveBeenCalled();
  act(() => root.unmount());
});
