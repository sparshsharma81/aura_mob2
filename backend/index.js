import cookieParser from 'cookie-parser';
import express, { urlencoded } from 'express';
import cors from 'cors';
import connectDB from './utils/db.js';

import { app, server, io } from "./socket/socket.js";
import userRoute from "./Routes/user.route.js";
import postRoute from "./Routes/post.route.js";
import messageRoute from "./Routes/message.route.js";
import path from 'path';
// Resolve __dirname in a way that works across runtimes
const __dirname = path.resolve();
// const PORT = process.env.PORT || 5000;
import dotenv from 'dotenv';
dotenv.config();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({extended:true}));
//CORS - cross origin resource sharing
const corsOptions = {
    origin: ['http://localhost:5173', 'https://aura-xgeu.onrender.com', 'http://localhost:5000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
};
app.use(cors(corsOptions));
app.use("/api/v1/user",userRoute);
app.use("/api/v1/post",postRoute);
app.use("/api/v1/message",messageRoute);
// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../frontend/dist")));
// Catch-all handler: send back React's index.html file for any non-API routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});
connectDB().then(()=>{
    server.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    })}).catch((error)=>{
        console.log("Failed to connect to database",error);
    });
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  } else {
    throw err;
  }
});
