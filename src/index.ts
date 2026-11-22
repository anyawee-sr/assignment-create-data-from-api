import fastify from 'fastify';
import { fetchUserList } from './services/users.js';
import { transformUserListGroupByDepartment } from './utils/transform.js';
import { isResUsers } from './utils/resTypeCheck.js';

const app = fastify();

app.get('/users/grouped-by-department', async () => {
  const data = await fetchUserList();

  if (!isResUsers(data)) {
    throw Object.assign(new Error('Unexpected response shape from users API'));
  }

  return transformUserListGroupByDepartment(data.users);
});

app.listen({ port: 3000 });
