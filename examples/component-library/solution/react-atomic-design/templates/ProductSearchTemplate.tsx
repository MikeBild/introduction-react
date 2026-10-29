import type { ReactNode } from 'react';

// Template: legt nur das Layout fest. Es kennt weder Daten noch State.
type ProductSearchTemplateProps = {
  title: ReactNode;
  searchField: ReactNode;
  resultSummary: ReactNode;
  results: ReactNode;
};

export const ProductSearchTemplate = ({
  title,
  searchField,
  resultSummary,
  results,
}: ProductSearchTemplateProps) => (
  <section aria-labelledby="product-search-heading">
    <h2 id="product-search-heading">{title}</h2>
    {searchField}
    <p aria-live="polite">{resultSummary}</p>
    {results}
  </section>
);
