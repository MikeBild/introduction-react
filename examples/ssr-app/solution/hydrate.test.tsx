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

it('übernimmt das Server-HTML ohne Mismatch und macht den Button klickbar', async () => {
  const consoleError = vi.spyOn(console, 'error');
  const data = await loadProductPage();
  const container = document.createElement('div');
  container.innerHTML = renderToString(<App data={data} />);
  document.body.append(container);
  const serverHeading = screen.getByRole('heading', { level: 1 });

  const root = await act(async () => hydrate(container, data));
  await userEvent.click(
    screen.getByRole('button', { name: 'Handmühle in den Warenkorb' })
  );

  expect(screen.getByText('Im Warenkorb: 1')).toBeInTheDocument();
  // Dasselbe DOM-Element wie vom Server: React hat es übernommen, nicht ersetzt.
  expect(screen.getByRole('heading', { level: 1 })).toBe(serverHeading);
  expect(consoleError).not.toHaveBeenCalled();
  act(() => root.unmount());
});
