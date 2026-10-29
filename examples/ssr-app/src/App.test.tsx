import { renderToString } from 'react-dom/server';
import { expect, it } from 'vitest';
import { App } from './App';
import { loadProductPage, serializeProductPageData } from './productPage';

it('rendert Produkt, Preis und Bewertungen auf dem Server', async () => {
  const html = renderToString(<App data={await loadProductPage()} />);
  expect(html).toContain('<h1>Handmühle</h1>');
  expect(html).toContain('49,00');
  expect(html).toContain('Mahlt sehr gleichmäßig.');
  expect(html).toContain('Im Warenkorb: <!-- -->0');
});

it('escaped Initial Data für das Script-Tag', async () => {
  const data = await loadProductPage();
  data.reviews[0].text = '</script><script>alert(1)</script>';
  const serialized = serializeProductPageData(data);
  expect(serialized).not.toContain('</script>');
  expect(JSON.parse(serialized)).toEqual(data);
});
