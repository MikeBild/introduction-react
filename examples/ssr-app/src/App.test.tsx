import { renderToString } from 'react-dom/server';
import { expect, it } from 'vitest';
import { App } from './App';
import { loadProductPage, serializeProductPageData } from './productPage';

it('renders product, price and reviews on the server', async () => {
  const html = renderToString(<App data={await loadProductPage()} />);
  expect(html).toContain('<h1>Drehmomentschlüssel</h1>');
  expect(html).toContain('89,90');
  expect(html).toContain('Löst sauber und hörbar aus.');
  expect(html).toContain('Im Warenkorb: <!-- -->0');
});

it('escapes Initial Data for the script tag', async () => {
  const data = await loadProductPage();
  data.reviews[0].text = '</script><script>alert(1)</script>';
  const serialized = serializeProductPageData(data);
  expect(serialized).not.toContain('</script>');
  expect(JSON.parse(serialized)).toEqual(data);
});
