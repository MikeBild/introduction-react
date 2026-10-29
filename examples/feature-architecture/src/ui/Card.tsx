import type { ReactNode } from 'react';

// Design System: keine Fachdaten, keine API-Aufrufe.
type CardProps = {
  header?: ReactNode;
  actions?: ReactNode;
  children: ReactNode;
};

export const Card = ({ header, actions, children }: CardProps) => (
  <section style={{ border: '1px solid #ccc', padding: 16, marginBottom: 8 }}>
    {header && <h2>{header}</h2>}
    {children}
    {actions && <footer>{actions}</footer>}
  </section>
);
