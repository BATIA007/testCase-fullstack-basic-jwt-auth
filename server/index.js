import express from "express"
import cors from "cors"
import authRouter from './routes/auth.js'
import postRouter from './routes/post.js'
import commentRouter from './routes/comments.js'
import fileUpload from "express-fileupload";

const app = express();

// CONSTANTS
const PORT = process.env.PORT || 5001;

// MIDLEWARES
app.use(express.json())
app.use(cors())

// ROUTES
app.use('/api/auth', authRouter)
app.use(fileUpload())
app.use('/api/posts', postRouter)
app.use(express.static('uploads'))
app.use('/api/comments', commentRouter)


// START
const start = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server was started on ${PORT}`)
    })
  } catch (err) {
    console.log(err)
  }
}

start()