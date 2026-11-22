import * as grpc from '@grpc/grpc-js';
import {
  users,
  type IGetUsersGroupedByDepartmentResponse,
  type TGetUsersGroupedByDepartmentRequest,
} from './proto.js';
import { fetchUserList } from '../services/users.js';
import { isResUsers } from '../utils/resTypeCheck.js';
import { transformUserListGroupByDepartment } from '../utils/transform.js';

const getUsersGroupedByDepartmentHandler: grpc.handleUnaryCall<
  TGetUsersGroupedByDepartmentRequest,
  IGetUsersGroupedByDepartmentResponse
> = async (_call, callback) => {
  try {
    const data = await fetchUserList();

    if (!isResUsers(data)) {
      throw new Error('Unexpected response shape from users API');
    }

    callback(null, {
      departments: transformUserListGroupByDepartment(data.users),
    });
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
