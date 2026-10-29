import { fireEvent, render, screen } from '@testing-library/react';
import { expect, it, vi } from 'vitest';
import { ProductPage } from './ProductPage';

it('rendert alle 2.000 Produkte', () => {
  render(<ProductPage onRender={() => {}} />);
  expect(screen.getAllByRole('row')).toHaveLength(2001);
});

// Übung react-rendering-performance: .skip entfernen
it.skip('rendert die Tabelle beim Tippen in der Notiz nicht neu', () => {
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
