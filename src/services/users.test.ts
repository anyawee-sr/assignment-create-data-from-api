import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchUserList } from './users.js';

const fetchMock = vi.fn();
vi.stubGlobal('fetch', fetchMock);

afterEach(() => {
  vi.resetAllMocks();
});

describe('fetchUserList', () => {
  it('requests all users from the dummyjson API', async () => {
    fetchMock.mockResolvedValue(new Response(JSON.stringify({ users: [] })));

    await fetchUserList();

    expect(fetchMock).toHaveBeenCalledWith('https://dummyjson.com/users?limit=0');
  });

  it('returns the parsed JSON body', async () => {
    const body = { users: [{ id: 1 }], total: 1, skip: 0, limit: 0 };
    fetchMock.mockResolvedValue(new Response(JSON.stringify(body)));

    await expect(fetchUserList()).resolves.toEqual(body);
  });

  it('throws when the response is not ok', async () => {
    fetchMock.mockResolvedValue(
      new Response(null, { status: 500, statusText: 'Internal Server Error' }),
    );

    await expect(fetchUserList()).rejects.toThrow('Failed to fetch users: Internal Server Error');
  });

  it('propagates network errors', async () => {
    fetchMock.mockRejectedValue(new TypeError('fetch failed'));

    await expect(fetchUserList()).rejects.toThrow('fetch failed');
  });
});
