import fastify from 'fastify';
import { fetchUserList } from './services/users.js';
import { transformUserListGroupByDepartment } from './utils/transform.js';
import { isResUsers } from './utils/resTypeCheck.js';

const PORT = Number(process.env.PORT ?? 3000);

const app = fastify({ logger: true });

app.get('/users/grouped-by-department', async () => {
  const data = await fetchUserList();

  if (!isResUsers(data)) {
    throw new Error('Unexpected response shape from users API');
  }

  return transformUserListGroupByDepartment(data.users);
});

try {
  await app.listen({ port: PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
