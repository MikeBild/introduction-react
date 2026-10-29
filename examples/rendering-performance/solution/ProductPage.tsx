import { Profiler, type ProfilerOnRenderCallback } from 'react';
import { logRender } from '../src/logRender';
import { ProductTable } from '../src/ProductTable';
import { products } from '../src/products';
import { NoteField } from './NoteField';

export const ProductPage = ({
  onRender = logRender,
}: {
  onRender?: ProfilerOnRenderCallback;
}) => {
  // Bleibt bewusst ohne Compiler: State Colocation reicht hier schon,
  // ganz ohne memo.
  'use no memo';
  return (
    <main>
      <h1>Produkte</h1>
      <NoteField />
      <Profiler id="ProductTable" onRender={onRender}>
        <ProductTable products={products} />
      </Profiler>
    </main>
  );
};
