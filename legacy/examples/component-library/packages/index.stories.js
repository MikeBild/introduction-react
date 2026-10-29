import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import List from '@introduction-react/list';
import Form from '@introduction-react/form';

storiesOf('React-Components', module)
  .addDecorator(withKnobs)
  .add('List', () => (
    <List
      rows={object('rows', [
        { id: 1, value: 'A' },
        { id: 2, value: 'B' },
      ])}
      renderRow={({ id, value }) => (
        <tr>
          <td>{id}</td>
          <td>{value}</td>
        </tr>
      )}
    />
  ))
  .add('Form', () => (
    <Form headline={text('headline', 'Hello Storybook')}>
      <label>Text Input</label>
      <input type='text' />
    </Form>
  ));
