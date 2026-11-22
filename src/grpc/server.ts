import * as grpc from '@grpc/grpc-js';
import {
  users,
  type IGetUsersGroupedByDepartmentResponse,
  type TGetUsersGroupedByDepartmentRequest,
} from './proto.js';
import { getUsersGroupedByDepartment } from '../services/usersGroupedByDepartment.js';

const getUsersGroupedByDepartmentHandler: grpc.handleUnaryCall<
  TGetUsersGroupedByDepartmentRequest,
  IGetUsersGroupedByDepartmentResponse
> = async (_call, callback) => {
  try {
    callback(null, { departments: await getUsersGroupedByDepartment() });
  } catch (err) {
    console.error(err);

    callback({
      code: grpc.status.INTERNAL,
      details: err instanceof Error ? err.message : 'Failed to get users',
    });
  }
};

export const buildGrpcServer = () => {
  const server = new grpc.Server();

  server.addService(users.UserService.service, {
    GetUsersGroupedByDepartment: getUsersGroupedByDepartmentHandler,
  });

  return server;
};
