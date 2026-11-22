import { fileURLToPath } from 'node:url';
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import type { TTransformUserListGroupByDepartment } from '../types/transform/user.js';

export type TGetUsersGroupedByDepartmentRequest = Record<string, never>;

export interface IGetUsersGroupedByDepartmentResponse {
  departments: TTransformUserListGroupByDepartment;
}

const PROTO_PATH = fileURLToPath(new URL('../../proto/users.proto', import.meta.url));

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  defaults: true,
});

export const { users } = grpc.loadPackageDefinition(packageDefinition) as unknown as {
  users: { UserService: grpc.ServiceClientConstructor };
};
