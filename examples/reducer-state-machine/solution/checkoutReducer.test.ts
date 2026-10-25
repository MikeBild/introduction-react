import { describe, expect, it } from 'vitest';
import { checkoutReducer } from './checkoutReducer';

describe('checkoutReducer (solution)', () => {
  it('ignores succeeded while idle', () => {
    const idleState = { status: 'idle' } as const;
    expect(
      checkoutReducer(idleState, { type: 'succeeded', orderId: '42' })
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
      checkoutReducer({ status: 'success', orderId: '42' }, { type: 'reset' })
    ).toEqual({ status: 'idle' });
  });
});
