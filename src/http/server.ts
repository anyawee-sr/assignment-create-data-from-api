import fastify from 'fastify';
import { fetchUserList } from '../services/users.js';
import { isResUsers } from '../utils/resTypeCheck.js';
import { transformUserListGroupByDepartment } from '../utils/transform.js';

export const buildHttpServer = () => {
  const app = fastify({ logger: true });

  app.get('/users/grouped-by-department', async () => {
    const data = await fetchUserList();

    if (!isResUsers(data)) {
      throw new Error('Unexpected response shape from users API');
    }

    return transformUserListGroupByDepartment(data.users);
  });

  return app;
};
