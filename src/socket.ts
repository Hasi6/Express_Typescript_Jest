import { Server } from 'socket.io';

export const socket = (io: Server) => {
  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.emit('message', { message: 'hello world' });
  });
};
