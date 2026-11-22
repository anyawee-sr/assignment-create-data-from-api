import { buildHttpServer } from './http/server.js';

const PORT = Number(process.env.PORT ?? 3000);

const app = buildHttpServer();

try {
  await app.listen({ port: PORT });
} catch (err) {
  app.log.error(err);
  process.exit(1);
}
