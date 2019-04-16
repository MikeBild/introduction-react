import { configure } from '@storybook/react';

function loadStories() {
  require('../stories/atomics/buttons');
  require('../stories/atomics/search-input');
}

configure(loadStories, module);
