const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
const { Server } = require("socket.io"); //importing socket.io from library
const http = require("http")

//initializing cors
app.use(cors());

// create a server
const server = http.createServer(app)

//initializing socket server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

//import router file
const users = require("./routes/users");
const message = require("./routes/message");

app.use("/users", users);
app.use("/message", message);

//get socket connection
io.on("connection", (socket) => {
  //
  console.log(`a user is connected ${socket.id}`);

  //joining room - the data is the room ID param passed from front-end
  socket.on("join_room", (data) => {
    console.log(`User with ID: ${socket.id} joined room: ${data}`)
  });

  //listening to message on backend and sending it out to frontend
  socket.on("send_message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive_message", data) //data.room is the data that has the room ID
  });

  

  //diconnect from socket
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id)
  })



  //   socket.on("send_message", (data) => {
  //     //broadcast sends to all aside the sender: we pass the data to be sent
  //     socket.broadcast.emit("receive_message", data);
  //   });
});

server.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);
