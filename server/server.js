require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require("helmet");
const expImg = require('express-fileupload')
const path = require("path");
const isAuth = require('./middleware/auth')

const app = express();

const http = require('http').Server(app)

const io = require('socket.io')(http, { 
  cors: {
  origin: "http://localhost:3000",
}})


app.use(express.json())
app.use(cors())
app.use(helmet({
  contentSecurityPolicy: false,
}));





app.use(cookieParser())
app.use(expImg({
    useTempFiles: true
}))


app.use('/images', express.static(path.join(__dirname, 'public/images')))


app.use('/auth', require('./routes/authRoute'))
app.use('/users', require('./routes/userRoute'))
app.use('/posts', require('./routes/postRoute'))
app.use('/api', require('./routes/uploadRoute'))
app.use('/api', require('./routes/messageRoute'))
app.use('/api', require('./routes/comment'))
app.use('/api', require('./routes/conversationRoute'))

if (true){
  app.enable("trust proxy");

  app.use(express.static(__dirname + "/build"));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "./build/index.html"));
  });
}



//socket connection config--[ to be re configured in a dictionary format ]]

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when connect
  // console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    // console.log("a user disconnected!");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

//socket connection config ends



const port = process.env.PORT || 5000



const server = http.listen(port, ()=> {
  console.log(`Server running on port: ${port}`)
  mongoose.connect(`mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASSWORD}@real.jme6j.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
  })
  .then(()=> {
      console.log('MongoDB is running...')
  })
  .catch(err=> console.log(err))
})


process.on('rejectionHandled', async (error, promise)=> {
  console.log('Logged Error: '+ error)
  server.close(()=> process.exit(1))
})





















// const io = require("socket.io")(8080, {
//   cors: {
//     origin: "http://localhost:3000",
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   //when ceonnect
//   console.log("a user connected.");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

  //send and get message
  // socket.on("sendMessage", ({ senderId, receiverId, text }) => {
  //   const user = getUser(receiverId);
  //   io.to(user?.socketId).emit("getMessage", {
  //     senderId,
  //     text,
  //   });
  // });

  // when disconnect
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });