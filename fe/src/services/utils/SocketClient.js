// import APIError from '../../errors/APIError';
import { io } from 'socket.io-client';

class SocketClient {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.socket = io(this.baseURL);
  }

  sendSocket(socket) {
    return this.socket.emit(socket);
  }

  receiveSocket() {
    return this.socket.on('message', (data) => {
      io.emit('received-message', data);
    });
  }

  disconnect() {
    return this.socket.on('disconnect', (reason) => {
      console.log(`disconnected due to ${reason}`);
    });
  }

  makeConnection() {
    const socketConnection = this.socket.on('connect', (socket) => socket);
    return socketConnection;
  }
}

export default SocketClient;
