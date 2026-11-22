import { describe, expect, it } from 'vitest';
import { isResUsers } from './resTypeCheck.js';

const validRes = { users: [], total: 0, skip: 0, limit: 0 };

describe('isResUsers', () => {
  it('returns true for a valid users response', () => {
    expect(isResUsers(validRes)).toBe(true);
  });

  it('returns true when users contains items', () => {
    expect(isResUsers({ ...validRes, users: [{ id: 1 }], total: 1 })).toBe(true);
  });

  it.each([null, undefined, 'users', 42, true, []])('returns false for %j', (value) => {
    expect(isResUsers(value)).toBe(false);
  });

  it('returns false when users is not an array', () => {
    expect(isResUsers({ ...validRes, users: 'nope' })).toBe(false);
  });

  it.each(['users', 'total', 'skip', 'limit'])('returns false when %s is missing', (key) => {
    const res: Record<string, unknown> = { ...validRes };
    delete res[key];

    expect(isResUsers(res)).toBe(false);
  });
});
