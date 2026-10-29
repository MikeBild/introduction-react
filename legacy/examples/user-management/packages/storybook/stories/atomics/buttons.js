import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import {
  PrimaryButton,
  UserAddPrimaryButton,
} from '@introduction-react/component-library';

storiesOf('React-Component-Library/Atomics/Buttons', module)
  .addDecorator(withKnobs)
  .add('PrimaryButton', () => {
    return (
      <PrimaryButton to={text('to', '/foo')}>
        {text('children', 'foo')}
      </PrimaryButton>
    );
  })
  .add('UserAddPrimaryButton', () => {
    return <UserAddPrimaryButton>Add a user</UserAddPrimaryButton>;
  });
