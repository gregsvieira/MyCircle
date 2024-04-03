import SocketClient from './utils/SocketClient';

class MessagesService {
  constructor() {
    this.socketClient = new SocketClient('http://localhost:3001');
  }

  connect() {
    const connection = this.socketClient.makeConnection();
    return connection;
  }

  disconnect() {
    const disconnected = this.socketClient.disconnect();
    return disconnected;
  }

  sendMesssage(message) {
    const messageSended = this.socketClient.sendSocket(message);
    return messageSended;
  }

  receiveMessage(chatId) {
    const receivedMessage = this.socketClient.receiveSocket(chatId);
    return receivedMessage;
  }
}

export default new MessagesService();
