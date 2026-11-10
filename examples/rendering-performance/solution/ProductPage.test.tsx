import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { ProductPage } from './ProductPage';

it('renders all 2,000 products', () => {
  render(<ProductPage onRender={() => {}} />);
  expect(screen.getAllByRole('row')).toHaveLength(2001);
});

it('does not re-render the table while typing in the note', () => {
  const onRender = vi.fn();
  render(<ProductPage onRender={onRender} />);
  onRender.mockClear();
  const noteInput = screen.getByLabelText('Notiz zur Bestellung');
  fireEvent.change(noteInput, { target: { value: 'B' } });
  fireEvent.change(noteInput, { target: { value: 'Bi' } });
  fireEvent.change(noteInput, { target: { value: 'Bit' } });
  expect(noteInput).toHaveValue('Bit');
  expect(onRender).not.toHaveBeenCalled();
});
