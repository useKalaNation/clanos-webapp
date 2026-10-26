import { act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';

import { useViewingAsStore } from './viewing-as-store';

describe('useViewingAsStore', () => {
  beforeEach(() => {
    useViewingAsStore.setState({ role: 'member' });
  });

  it('starts as a member and switches role', () => {
    expect(useViewingAsStore.getState().role).toBe('member');

    act(() => {
      useViewingAsStore.getState().setRole('clan-master');
    });

    expect(useViewingAsStore.getState().role).toBe('clan-master');
  });
});
