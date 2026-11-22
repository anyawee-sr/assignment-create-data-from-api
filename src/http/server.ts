import fastify from 'fastify';
import { getUsersGroupedByDepartment } from '../services/usersGroupedByDepartment.js';

export const buildHttpServer = () => {
  const app = fastify({ logger: true });

  app.get('/users/grouped-by-department', () => getUsersGroupedByDepartment());

  return app;
};
