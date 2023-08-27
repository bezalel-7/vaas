const express = require('express')
const userRoutes = require('./routes/userRoutes')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', userRoutes)

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('connected to db')
  })
  .catch((err) => {
    console.log(err.message)
  })

const server = app.listen(process.env.PORT, () => {
  console.log(`Sever started on port ${process.env.PORT}`)
})
