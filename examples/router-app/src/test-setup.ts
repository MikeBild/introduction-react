import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

afterEach(cleanup);

// jsdom kennt kein Scrollen, der Router stellt aber die Scroll-Position wieder her.
window.scrollTo = () => {};
