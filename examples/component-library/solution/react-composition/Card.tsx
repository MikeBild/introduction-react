import type { ReactNode } from 'react';

// Slots statt Flags: Der Aufrufer gibt Inhalte hinein, die Card ordnet sie nur an.
type CardProps = {
  header: ReactNode;
  children?: ReactNode;
  actions?: ReactNode;
};

export const Card = ({ header, children, actions }: CardProps) => (
  <article className="card">
    <header>{header}</header>
    {children}
    {actions && <footer className="card__footer">{actions}</footer>}
  </article>
);
