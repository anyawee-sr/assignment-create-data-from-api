import { describe, it, expect } from 'vitest';
import { groupByDepartment } from './transform.js';
import type { IUser } from '../types.js';

const makeUser = (overrides: Partial<IUser> = {}): IUser => {
  return {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    gender: 'male',
    hair: { color: 'Black' },
    address: { postalCode: '10000' },
    company: { department: 'Engineering' },
    ...overrides,
  };
}

describe('groupByDepartment', () => {
  it('returns empty object for empty input', () => {
    expect(groupByDepartment([])).toEqual({});
  });

  it('groups users by department', () => {
    const data = [
      makeUser({ company: { department: 'Engineering' } }),
      makeUser({ company: { department: 'Marketing' } }),
    ];

    const result = groupByDepartment(data);

    expect(Object.keys(result).sort()).toEqual(['Engineering', 'Marketing']);
  });

  it('counts male and female', () => {
    const data = [
      makeUser({ gender: 'male' }),
      makeUser({ gender: 'female' }),
      makeUser({ gender: 'female' }),
    ];

    const result = groupByDepartment(data);

    expect(result.Engineering?.male).toBe(1);
    expect(result.Engineering?.female).toBe(2);
  });

  it('calculates age range', () => {
    const data = [
      makeUser({ age: 40 }),
      makeUser({ age: 22 }),
      makeUser({ age: 35 }),
    ];

    const result = groupByDepartment(data);

    expect(result.Engineering?.ageRange).toBe('22-40');
  });

  it('uses same age for min and max when only one user', () => {
    const data = [makeUser({ age: 30 })];
    const result = groupByDepartment(data);

    expect(result.Engineering?.ageRange).toBe('30-30');
  });

  it('counts hair colors', () => {
    const data = [
      makeUser({ hair: { color: 'Black' } }),
      makeUser({ hair: { color: 'Black' } }),
      makeUser({ hair: { color: 'Blond' } }),
    ];

    const result = groupByDepartment(data);

    expect(result.Engineering?.hair).toEqual({ Black: 2, Blond: 1 });
  });

  it('maps full name to postal code', () => {
    const data = [
      makeUser({
        firstName: 'Terry',
        lastName: 'Medhurst',
        address: {
          postalCode: '12345'
        }
      }),
    ];

    const result = groupByDepartment(data);

    expect(result.Engineering?.addressUser).toEqual({ TerryMedhurst: '12345' });
  });
});
