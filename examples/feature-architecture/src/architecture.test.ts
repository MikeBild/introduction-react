import { describe, expect, it } from 'vitest';

// Jede Quelldatei als Rohtext, z. B. './features/cart/useCart.ts'.
const sourceFiles = import.meta.glob<string>(
  ['./**/*.{ts,tsx}', '!./**/*.test.{ts,tsx}'],
  { query: '?raw', import: 'default', eager: true }
);

type ImportEdge = { importer: string; target: string };

// Pfade ohne Endung, relativ zum Ordner, z. B. 'features/catalog/products'.
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

describe('Architektur', () => {
  it('ui und shared importieren nie aus features', () => {
    expect(
      importEdges.filter(
        ({ importer, target }) =>
          /^(ui|shared)\//.test(importer) && featureOf(target)
      )
    ).toEqual([]);
  });

  // Übung Schritt 1: .skip entfernen
  it.skip('Features importieren andere Features nur über deren index.ts', () => {
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

  // Übung Schritt 3
  it.todo('Features importieren nie aus der App-Schicht (App.tsx)');
});
