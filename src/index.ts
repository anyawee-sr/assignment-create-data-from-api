import fastify from "fastify";
import { fetchUsers } from "./services/userApi.js";

const app = fastify();

app.get('/users', async () => {
  const users = await fetchUsers();

  return users;
});

app.listen({ port: 3000 });