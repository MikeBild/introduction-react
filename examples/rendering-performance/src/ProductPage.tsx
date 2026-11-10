import { Profiler, useState, type ProfilerOnRenderCallback } from 'react';
import { logRender } from './logRender';
import { ProductTable } from './ProductTable';
import { products } from './products';

// Exercise react-rendering-performance: every keystroke in the note re-renders
// the whole table. Measure it first, then move the State down.
export const ProductPage = ({
  onRender = logRender,
}: {
  onRender?: ProfilerOnRenderCallback;
}) => {
  // Turns the React Compiler off for this Component so that you measure the
  // behavior without automatic memoization.
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
