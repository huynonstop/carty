import { SOCKET_URL } from '@/config/socket';
import { io } from 'socket.io-client';
const socket = io(SOCKET_URL);
socket.on('disconnect', (reason) => {
  console.log('disconnected', reason);
});
export default socket;
