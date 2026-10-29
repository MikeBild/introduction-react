import { describe, expect, it } from 'vitest';
import { checkoutReducer } from './checkoutReducer';
import { orderId } from '../src/shop';

describe('checkoutReducer (solution)', () => {
  it('ignoriert succeeded im Status idle', () => {
    const idleState = { status: 'idle' } as const;
    expect(
      checkoutReducer(idleState, { type: 'succeeded', orderId: orderId('o42') })
    ).toBe(idleState);
  });

  it('ignoriert submitted während submitting', () => {
    const submittingState = { status: 'submitting' } as const;
    expect(checkoutReducer(submittingState, { type: 'submitted' })).toBe(
      submittingState
    );
  });

  it('setzt von success zurück auf idle', () => {
    expect(
      checkoutReducer(
        { status: 'success', orderId: orderId('o42') },
        { type: 'reset' }
      )
    ).toEqual({ status: 'idle' });
  });
});
