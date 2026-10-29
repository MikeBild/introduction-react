import type { Preview } from '@storybook/react-vite';
import '../src/library.css';

const preview: Preview = {
  // Erzeugt für jede Component eine Docs-Seite aus Props und Stories.
  tags: ['autodocs'],
};

export default preview;
