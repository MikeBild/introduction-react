import type { ReactNode } from 'react';

export const Badge = ({ children }: { children: ReactNode }) => (
  <span className="badge">{children}</span>
);
