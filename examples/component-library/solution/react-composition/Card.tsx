import type { ReactNode } from 'react';

// Slots instead of flags: the caller passes content in, the Card only arranges it.
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
