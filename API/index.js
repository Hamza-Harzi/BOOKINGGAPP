import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
dotenv.config();

// this function is to connect mongoDb
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO); //use here the secret url from mongoDb (i put the link in .evn)
    console.log("Connected to mongoDb");
  } catch (error) {
    throw error;
  }
};

//if mongodb is not connected
mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected!");
});

//middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.use((err, req, res, next) => {
  // pour etre capable de personnaliser votre error
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "something went wrong!";
  return res.status(errorStatus).json({
    seccess: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
// the port that app will open
app.listen(8800, () => {
  connect(); // we call the function connect
  console.log("connected to backend!");
});
