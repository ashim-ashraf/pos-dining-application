import mongoose from "mongoose";
import { app } from "./app";

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI must be defined");
  }

  await mongoose.connect(process.env.MONGO_URI, {
      dbName:'pos',
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log('MongoDB Connected!');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });

  app.listen(3000, () => {
    console.log("Listening on port 3000!!!!!!!!");
  });
}

start();
