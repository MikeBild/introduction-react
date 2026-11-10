import { describe, expect, it } from 'vitest';
import { checkoutReducer } from './checkoutReducer';
import { orderId } from '../src/shop';

describe('checkoutReducer (solution)', () => {
  it('ignores succeeded in the idle status', () => {
    const idleState = { status: 'idle' } as const;
    expect(
      checkoutReducer(idleState, { type: 'succeeded', orderId: orderId('o42') })
    ).toBe(idleState);
  });

  it('ignores submitted while submitting', () => {
    const submittingState = { status: 'submitting' } as const;
    expect(checkoutReducer(submittingState, { type: 'submitted' })).toBe(
      submittingState
    );
  });

  it('resets from success back to idle', () => {
    expect(
      checkoutReducer(
        { status: 'success', orderId: orderId('o42') },
        { type: 'reset' }
      )
    ).toEqual({ status: 'idle' });
  });
});
