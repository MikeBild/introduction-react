import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StateHandler } from '../src/components/EventHandler';

it('<StateHandler /> should display content attribute', () => {
  const { debug } = render(<StateHandler content="Hello World" />);
  expect(screen.getByTestId('statehandler-output')).toHaveTextContent(
    'Hello World'
  );
  fireEvent.change(screen.getByTestId('statehandler-input'), {
    target: { value: '23' },
  });
  expect(screen.getByTestId('statehandler-output')).toHaveTextContent('23');
});

it('<StateHandler /> input change to 23 should display content 23', () => {
  const { debug } = render(<StateHandler content="Hello World" />);
  fireEvent.change(screen.getByTestId('statehandler-input'), {
    target: { value: '23' },
  });
  expect(screen.getByTestId('statehandler-output')).toHaveTextContent('23');
});
