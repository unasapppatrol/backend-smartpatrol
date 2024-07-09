import { Server } from "socket.io";

const io = new Server();

io.on("connection", (socket) => {
  console.log(`User connected with id ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

export function Broadcast(event, data) {
  io.emit(event, data);
}

export default io;
