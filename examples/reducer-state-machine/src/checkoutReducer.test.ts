import { describe, expect, it } from 'vitest';
import { checkoutReducer } from './checkoutReducer';
import { orderId } from './shop';

describe('checkoutReducer', () => {
  it('goes from submitting to success', () => {
    expect(
      checkoutReducer(
        { status: 'submitting' },
        { type: 'succeeded', orderId: orderId('o42') }
      )
    ).toEqual({ status: 'success', orderId: orderId('o42') });
  });

  // Exercise step 2: remove .skip
  it.skip('ignores succeeded in the idle status', () => {
    const idleState = { status: 'idle' } as const;
    expect(
      checkoutReducer(idleState, { type: 'succeeded', orderId: orderId('o42') })
    ).toBe(idleState);
  });

  it.skip('ignores submitted while submitting', () => {
    const submittingState = { status: 'submitting' } as const;
    expect(checkoutReducer(submittingState, { type: 'submitted' })).toBe(
      submittingState
    );
  });

  // Exercise step 3
  it.todo('resets from success back to idle');
});
