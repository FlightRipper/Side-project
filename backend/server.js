// installed node packages express and boyd parser and mysql
import express from 'express';
import userRouter from './routes/usersRoute.js';
import memeRouter from './routes/memesRoute.js';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';


const app = express();

app.use(cors());

app.use(bodyParser.json());
//altering the app and refreshing it after in change in the tables

//This middleware is responsible for parsing the JSON data in the request body and making it available in req.body.
app.use(express.json());
//corse middleware is responsible for to handle cors policy between the front and the back

//middleware for sending static images
app.use('/uploads', express.static('uploads'));

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: 'http://localhost:5173', // Replace with your React app's origin
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use((req, res, next) => {
  req.io = io; // Attach io to the request object
  next();
});

io.on('connection', (socket) => {
  console.log('New client connected with socketId:', socket.id);
 
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// app usages
app.use('/users', userRouter);
app.use('/memes', memeRouter);

//app connection
server.listen(5000, () => {
  console.log('app is running and listening on port 5000');
});
