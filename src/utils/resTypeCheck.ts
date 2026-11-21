import type { IUsersResponse } from '../types/services/user.js';

export const isResUsers = (res: unknown): res is IUsersResponse => {
  return (
    typeof res === 'object' &&
    res !== null &&
    'users' in res &&
    Array.isArray(res.users) &&
    'total' in res &&
    'skip' in res &&
    'limit' in res
  );
};
