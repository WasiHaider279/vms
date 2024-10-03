import { io, Socket } from "socket.io-client";

const socket: Socket = io(
  "https://ismmart-ecommerce-backend-e233368b3b0d.herokuapp.com/api" || ""
);

export default socket;
