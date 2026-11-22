import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildHttpServer } from './server.js';
import { fetchUserList } from '../services/users.js';

vi.mock('../services/users.js', () => ({
  fetchUserList: vi.fn(),
}));

const usersResponse = {
  users: [
    {
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      gender: 'male',
      hair: { color: 'Black', type: 'Straight' },
      address: { postalCode: '10000' },
      company: { department: 'Engineering' },
    },
  ],
  total: 1,
  skip: 0,
  limit: 0,
};

const summary = {
  Engineering: {
    male: 1,
    female: 0,
    ageRange: '30-30',
    hair: { Black: 1 },
    addressUser: { JohnDoe: '10000' },
  },
};

afterEach(() => {
  vi.resetAllMocks();
});

describe('GET /users/grouped-by-department', () => {
  it('returns users grouped by department', async () => {
    vi.mocked(fetchUserList).mockResolvedValue(usersResponse);
    const app = buildHttpServer();

    const res = await app.inject({ method: 'GET', url: '/users/grouped-by-department' });

    expect(res.statusCode).toBe(200);
    expect(res.json()).toEqual(summary);
  });

  it('returns 500 when the API response has an unexpected shape', async () => {
    vi.mocked(fetchUserList).mockResolvedValue({ users: 'nope' });
    const app = buildHttpServer();

    const res = await app.inject({ method: 'GET', url: '/users/grouped-by-department' });

    expect(res.statusCode).toBe(500);
  });

  it('returns 500 when fetching users fails', async () => {
    vi.mocked(fetchUserList).mockRejectedValue(new Error('boom'));
    const app = buildHttpServer();

    const res = await app.inject({ method: 'GET', url: '/users/grouped-by-department' });

    expect(res.statusCode).toBe(500);
  });
});
