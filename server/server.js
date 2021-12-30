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



app.use(express.json())
app.use(cors())
app.use(helmet());

if (process.env.NODE_ENV === "production"){
  app.enable("trust proxy");

  app.use(express.static("../client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname,  "../client/build/index.html"));
  });
}



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



const port = process.env.PORT || 5000

const server = app.listen(port, ()=> {
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
