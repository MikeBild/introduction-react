import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { SearchInput } from 'component-library';

storiesOf('React-Component-Library/Atomics', module)
  .addDecorator(withKnobs)
  .add('Search Input', () => {
    return (
      <SearchInput data={['Joe', 'Andre', 'Peter', 'Max', 'Paul', 'Mike']} />
    );
  });
