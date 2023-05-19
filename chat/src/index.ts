import mongoose from "mongoose";
import { app, server } from "./app";
import { Socket } from "socket.io";



const start = async () => {
  console.log("Chat service connecting....");

  const io = require("socket.io")(server, {
    path: "/api/socket",
    cors: {
      origin: ["*", "https://pos.com"],
      methods: ["GET", "POST", "OPTIONS"],
    },
  });

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "pos-chat",
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
    console.log("Connected to MongoDb");
  } catch (err) {
    console.error(err);
  }

  interface User {
    id: string;
    socketId: string;
  }
  
  let users: User[] = [];
  
  const addUser = (id: string, socketId: string): void => {
    !users.some((user) => user.id === id) &&
      users.push({ id, socketId });
  };

  const removeUser = (socketId: string) => {
    users = users.filter((user) => user.socketId !== socketId);
  };

  const getUser = (id: string) => {
    return users.find((user) => user.id === id);
  };

  io.on("connection", (socket: Socket) => {
    console.log("user connected");
    //take userid and socketId from user
    socket.on('addUser', id => {
      addUser(id, socket.id)
      console.log(id, socket.id);
    })

    socket.on("disconnect", () => {
      console.log("user disconneted");
      removeUser(socket.id);
    });

    socket.on("sendMessage", ({ senderid, receiverid, text }) => {
      const receiver = getUser(receiverid);
      console.log(receiverid);
      console.log(receiver);
  
      if (receiver) {
        console.log("here");
  
        io.to(receiver?.socketId).emit("getMessage", {
          senderid,
          text,
        });
      }
    });
  });

  server.listen(3000, () => {
    console.log("server connected");
  });
};

start();
