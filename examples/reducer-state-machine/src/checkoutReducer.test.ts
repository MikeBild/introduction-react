import { describe, expect, it } from 'vitest';
import { checkoutReducer } from './checkoutReducer';
import { orderId } from './shop';

describe('checkoutReducer', () => {
  it('geht von submitting nach success', () => {
    expect(
      checkoutReducer(
        { status: 'submitting' },
        { type: 'succeeded', orderId: orderId('o42') }
      )
    ).toEqual({ status: 'success', orderId: orderId('o42') });
  });

  // Übung Schritt 2: .skip entfernen
  it.skip('ignoriert succeeded im Status idle', () => {
    const idleState = { status: 'idle' } as const;
    expect(
      checkoutReducer(idleState, { type: 'succeeded', orderId: orderId('o42') })
    ).toBe(idleState);
  });

  it.skip('ignoriert submitted während submitting', () => {
    const submittingState = { status: 'submitting' } as const;
    expect(checkoutReducer(submittingState, { type: 'submitted' })).toBe(
      submittingState
    );
  });

  // Übung Schritt 3
  it.todo('setzt von success zurück auf idle');
});
