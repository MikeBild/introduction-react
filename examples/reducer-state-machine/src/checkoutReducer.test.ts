import { describe, expect, it } from 'vitest';
import { checkoutReducer } from './checkoutReducer';

describe('checkoutReducer', () => {
  it('moves from submitting to success', () => {
    expect(
      checkoutReducer(
        { status: 'submitting' },
        { type: 'succeeded', orderId: '42' }
      )
    ).toEqual({ status: 'success', orderId: '42' });
  });

  // Exercise step 2: remove .skip
  it.skip('ignores succeeded while idle', () => {
    const idleState = { status: 'idle' } as const;
    expect(
      checkoutReducer(idleState, { type: 'succeeded', orderId: '42' })
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
