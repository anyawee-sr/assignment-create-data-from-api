import * as grpc from '@grpc/grpc-js';
import {
  users,
  type IGetUsersGroupedByDepartmentResponse,
  type TGetUsersGroupedByDepartmentRequest,
} from './proto.js';

interface IUserServiceClient extends grpc.Client {
  GetUsersGroupedByDepartment(
    request: TGetUsersGroupedByDepartmentRequest,
    callback: grpc.requestCallback<IGetUsersGroupedByDepartmentResponse>,
  ): grpc.ClientUnaryCall;
}

const GRPC_ADDRESS = process.env.GRPC_ADDRESS ?? 'localhost:50051';

const client = new users.UserService(
  GRPC_ADDRESS,
  grpc.credentials.createInsecure(),
) as unknown as IUserServiceClient;

client.GetUsersGroupedByDepartment({}, (err, response) => {
  if (err) {
    console.error(`gRPC error [${grpc.status[err.code]}]: ${err.details}`);
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(response, null, 2));
  }

  client.close();
});
