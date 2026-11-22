import * as grpc from '@grpc/grpc-js';
import { buildGrpcServer } from './server.js';

const GRPC_PORT = Number(process.env.GRPC_PORT ?? 50051);

const server = buildGrpcServer();

try {
  const port = await new Promise<number>((resolve, reject) => {
    server.bindAsync(
      `0.0.0.0:${GRPC_PORT}`,
      grpc.ServerCredentials.createInsecure(),
      (err, boundPort) => (err ? reject(err) : resolve(boundPort)),
    );
  });

  console.info(`gRPC server listening on port ${port}`);
} catch (err) {
  console.error(err);
  process.exit(1);
}
