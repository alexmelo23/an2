import io from "socket.io-client";

export default class Socket {
  public static socketIO: any;
  public constructor() {
    ///////////////////////// load socket ///////////////
    try {
      Socket.socketIO = io("https://localhost:3002");
      console.info("socket.io is connected");
    } catch (err) {
      console.error(err);
    }
  }

  public static connected = (): any => {
    return Socket.socketIO;
  };
}
