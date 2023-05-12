import mongoose from "mongoose";
import { app, server } from "./app";
import { Socket } from "socket.io";



const start = async () => {

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

  // let users = [];

  // const addUser = (tableId: string, socketId: string) => {
  //   !users.some(user => user.tableId === tableId) &&
  //   users.push({tableId, socketId})
  // }

  io.on("connection", (socket: Socket) => {
    console.log("user connected");
    //take userid and socketId from user
    // socket.on('addUser', tableId => {
    //   addUser(tableId, socket.id)
    // }) 
  });

  server.listen(3000, () => {
    console.log("server connected");
  });
};

start();
