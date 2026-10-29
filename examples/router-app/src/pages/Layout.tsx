import type { ReactNode } from 'react';
import type { Page } from '../App';

type LayoutProps = {
  onNavigate: (page: Page) => void;
  children: ReactNode;
};

// Navigation per Button: Die Adresszeile ändert sich nie.
export const Layout = ({ onNavigate, children }: LayoutProps) => (
  <>
    <header>
      <nav aria-label="Hauptnavigation">
        <button type="button" onClick={() => onNavigate({ name: 'home' })}>
          Start
        </button>{' '}
        <button type="button" onClick={() => onNavigate({ name: 'about' })}>
          Über uns
        </button>{' '}
        <button type="button" onClick={() => onNavigate({ name: 'resources' })}>
          Ressourcen
        </button>
      </nav>
    </header>
    <main>{children}</main>
    <footer>Router App</footer>
  </>
);
