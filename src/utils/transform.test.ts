import { describe, it, expect } from 'vitest';
import { transformUserListGroupByDepartment } from './transform.js';
import type {
  IAddressResponse,
  ICompanyResponse,
  IHairResponse,
  IUserResponse,
} from '../types/services/user.js';

const baseAddress: IAddressResponse = {
  address: '1 Main St',
  city: 'Bangkok',
  state: 'Bangkok',
  stateCode: 'BKK',
  postalCode: '10000',
  coordinates: { lat: 0, lng: 0 },
  country: 'Thailand',
};

const baseHair: IHairResponse = { color: 'Black', type: 'Straight' };

const baseUser: IUserResponse = {
  id: 1,
  firstName: 'John',
  lastName: 'Doe',
  maidenName: '',
  age: 30,
  gender: 'male',
  email: 'john@example.com',
  phone: '000-000-0000',
  username: 'john',
  password: 'password',
  birthDate: '1996-01-01',
  image: '',
  bloodGroup: 'O+',
  height: 170,
  weight: 70,
  eyeColor: 'Brown',
  hair: baseHair,
  ip: '127.0.0.1',
  address: baseAddress,
  macAddress: '00:00:00:00:00:00',
  university: 'University',
  bank: {
    cardExpire: '01/30',
    cardNumber: '0000000000000000',
    cardType: 'Visa',
    currency: 'THB',
    iban: 'TH00',
  },
  company: {
    department: 'Engineering',
    name: 'Company',
    title: 'Engineer',
    address: baseAddress,
  },
  ein: '00-0000000',
  ssn: '000-00-0000',
  userAgent: 'test',
  crypto: { coin: 'Bitcoin', wallet: '0x0', network: 'Ethereum (ERC20)' },
  role: 'user',
};

interface IUserOverrides extends Partial<
  Pick<IUserResponse, 'firstName' | 'lastName' | 'gender' | 'age'>
> {
  hair?: Partial<IHairResponse>;
  address?: Partial<IAddressResponse>;
  company?: Partial<ICompanyResponse>;
}

const makeUser = ({ hair, address, company, ...rest }: IUserOverrides = {}): IUserResponse => {
  return {
    ...baseUser,
    ...rest,
    hair: { ...baseUser.hair, ...hair },
    address: { ...baseUser.address, ...address },
    company: { ...baseUser.company, ...company },
  };
};

describe('transformUserListGroupByDepartment', () => {
  it('returns empty object for empty input', () => {
    expect(transformUserListGroupByDepartment([])).toEqual({});
  });

  it('groups users by department', () => {
    const data = [
      makeUser({ company: { department: 'Engineering' } }),
      makeUser({ company: { department: 'Marketing' } }),
    ];

    const result = transformUserListGroupByDepartment(data);

    expect(Object.keys(result).sort()).toEqual(['Engineering', 'Marketing']);
  });

  it('counts male and female', () => {
    const data = [
      makeUser({ gender: 'male' }),
      makeUser({ gender: 'female' }),
      makeUser({ gender: 'female' }),
    ];

    const result = transformUserListGroupByDepartment(data);

    expect(result.Engineering?.male).toBe(1);
    expect(result.Engineering?.female).toBe(2);
  });

  it('calculates age range', () => {
    const data = [makeUser({ age: 40 }), makeUser({ age: 22 }), makeUser({ age: 35 })];

    const result = transformUserListGroupByDepartment(data);

    expect(result.Engineering?.ageRange).toBe('22-40');
  });

  it('uses same age for min and max when only one user', () => {
    const data = [makeUser({ age: 30 })];
    const result = transformUserListGroupByDepartment(data);

    expect(result.Engineering?.ageRange).toBe('30-30');
  });

  it('counts hair colors', () => {
    const data = [
      makeUser({ hair: { color: 'Black' } }),
      makeUser({ hair: { color: 'Black' } }),
      makeUser({ hair: { color: 'Blond' } }),
    ];

    const result = transformUserListGroupByDepartment(data);

    expect(result.Engineering?.hair).toEqual({ Black: 2, Blond: 1 });
  });

  it('maps full name to postal code', () => {
    const data = [
      makeUser({
        firstName: 'Terry',
        lastName: 'Medhurst',
        address: {
          postalCode: '12345',
        },
      }),
    ];

    const result = transformUserListGroupByDepartment(data);

    expect(result.Engineering?.addressUser).toEqual({ TerryMedhurst: '12345' });
  });
});
