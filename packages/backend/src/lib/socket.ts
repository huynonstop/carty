import { Server, Socket } from 'socket.io';
import { Server as HTTPServer } from 'http';
import { corsOptions } from './cors';
import {
  socketTokenGuard,
  validSocketTokenGuard,
} from '@/modules/auth/auth.guard';
import { verifyToken } from './jwt';

type SocketErrorCallback = (err?: any) => void;
interface AppSocket extends Socket {
  locals?: any;
}
export type SocketMiddleWare = (
  socket: AppSocket,
  next: SocketErrorCallback,
) => void;

let io: Server | undefined = undefined;

const useSocketLocalsMiddleware: SocketMiddleWare = (
  socket: AppSocket,
  next,
) => {
  socket.locals = {};
  next();
};

export const initIO = (httpServer: HTTPServer) => {
  io = new Server(httpServer, {
    /* options */
    cors: corsOptions,
  });
  io.on('connection', (socket) => {
    socket.on('auth', async ({ accessToken }, authAck) => {
      const authAckData = {
        socketId: socket.id,
        statusCode: undefined as unknown,
      };
      try {
        await verifyToken(accessToken);
        authAckData.statusCode = 200;
      } catch (err) {
        authAckData.statusCode = 401;
      } finally {
        authAck(authAckData);
      }
    });

    socket.on('collection:sub', ({ collectionId }, subAck) => {
      socket.join(collectionId);
      subAck({
        socketId: socket.id,
        collectionId,
      });
    });

    socket.on('collection:unsub', ({ collectionId }, ack) => {
      socket.leave(collectionId);
      ack({
        socketId: socket.id,
        collectionId,
      });
    });

    socket.on('disconnect', (reason) => {
      console.log('disconnect', socket.id, reason);
    });
  });
  console.log('Init io');
  return io;
};

export const useIO = (callback: (io: Server) => any) => {
  if (!io) return null;
  return callback(io) || true;
};

export default io;
