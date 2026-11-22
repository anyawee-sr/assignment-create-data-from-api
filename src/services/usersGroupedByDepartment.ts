import { fetchUserList } from './users.js';
import { isResUsers } from '../utils/resTypeCheck.js';
import { transformUserListGroupByDepartment } from '../utils/transform.js';
import type { TTransformUserListGroupByDepartment } from '../types/transform/user.js';

export const getUsersGroupedByDepartment =
  async (): Promise<TTransformUserListGroupByDepartment> => {
    const data = await fetchUserList();

    if (!isResUsers(data)) {
      throw new Error('Unexpected response shape from users API');
    }

    return transformUserListGroupByDepartment(data.users);
  };
