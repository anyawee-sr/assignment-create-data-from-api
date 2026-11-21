/**
 * NOTE: Get all users from the API
 * see more: https://dummyjson.com/docs/users#users-limit_skip
 */
const API_URL = 'https://dummyjson.com/users?limit=0';

export const fetchUserList = async (): Promise<unknown> => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error(`Failed to fetch users: ${res.statusText}`);
  }

  const data = await res.json();

  return data;
};
