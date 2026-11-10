import React from 'react';
import { render, screen } from '@testing-library/react';
import Body from '../src/components/Body';

it('<Body /> should have h1 DOM-Element', () => {
  render(<Body />);
  expect(screen.getByTestId('headline')).toBeInTheDocument();
});
