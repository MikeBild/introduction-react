import { describe, expect, it } from 'vitest';

// Every source file of src/ as raw text, e.g. './features/cart/useCart.ts'.
const sourceFiles = import.meta.glob<string>(
  ['./**/*.{ts,tsx}', '!./**/*.test.{ts,tsx}'],
  { query: '?raw', import: 'default', eager: true }
);

type ImportEdge = { importer: string; target: string };

// Paths without extension, relative to src/, e.g. 'features/catalog/products'.
const toModulePath = (filePath: string) =>
  filePath.replace(/^\.\//, '').replace(/\.tsx?$/, '');

const importEdges: readonly ImportEdge[] = Object.entries(sourceFiles).flatMap(
  ([filePath, sourceCode]) =>
    [...sourceCode.matchAll(/from '(\.[^']+)'/g)].map(([, specifier]) => ({
      importer: toModulePath(filePath),
      target: new URL(specifier, `file:///${toModulePath(filePath)}`).pathname
        .slice(1)
        .replace(/\/index$/, ''),
    }))
);

const featureOf = (modulePath: string) =>
  modulePath.match(/^features\/([^/]+)/)?.[1];

describe('architecture', () => {
  it('ui and shared never import from features', () => {
    expect(
      importEdges.filter(
        ({ importer, target }) =>
          /^(ui|shared)\//.test(importer) && featureOf(target)
      )
    ).toEqual([]);
  });

  // Exercise step 1: remove .skip
  it.skip('features import other features only via their index.ts', () => {
    expect(
      importEdges.filter(({ importer, target }) => {
        const targetFeature = featureOf(target);
        return (
          featureOf(importer) &&
          targetFeature &&
          targetFeature !== featureOf(importer) &&
          target !== `features/${targetFeature}`
        );
      })
    ).toEqual([]);
  });

  // Exercise step 3
  it.todo('features never import from the app layer (App.tsx)');
});
