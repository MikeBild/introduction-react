import { Profiler, useState, type ProfilerOnRenderCallback } from 'react';
import { logRender } from './logRender';
import { ProductTable } from './ProductTable';
import { products } from './products';

// Übung react-rendering-performance: Jeder Tastendruck in der Notiz rendert
// die ganze Tabelle neu. Miss es zuerst, dann verschiebe den State nach unten.
export const ProductPage = ({
  onRender = logRender,
}: {
  onRender?: ProfilerOnRenderCallback;
}) => {
  // Schaltet den React Compiler für diese Component ab, damit du das
  // Verhalten ohne automatische Memoisierung misst.
  'use no memo';
  const [note, setNote] = useState('');

  return (
    <main>
      <h1>Produkte</h1>
      <label htmlFor="note">Notiz zur Bestellung</label>
      <input
        id="note"
        value={note}
        onChange={(event) => setNote(event.target.value)}
      />
      <Profiler id="ProductTable" onRender={onRender}>
        <ProductTable products={products} />
      </Profiler>
    </main>
  );
};
