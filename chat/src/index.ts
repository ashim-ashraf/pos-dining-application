import mongoose from "mongoose";
import { natsWrapper } from "./nats-wrapper";
import { app } from "./app";
import { Socket } from "socket.io";

// const io = require("socket.io")(8900,{
//     cors:{
//       origin:"https://pos.com:3000"
//     }
//   })

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose.connect(process.env.MONGO_URI, {
      dbName:'pos-chat',
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false 
    });
    console.log("Connected to MongoDb");

  //   await io.on("connection", (socket: Socket) => {
  //     console.log("user connected")
  //     io.emit("welcome", "hello this is socket server")
  // })
  
  } catch (err) {
    console.error(err);
  }

 
  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
};

start();
