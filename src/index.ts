import fastify from "fastify";
import { fetchUsers } from "./services/userApi.js";
import { groupByDepartment } from "./services/transform.js";

const app = fastify();

app.get('/users/grouped-by-department', async () => {
  const users = await fetchUsers();

  return groupByDepartment(users);
});

app.listen({ port: 3000 });