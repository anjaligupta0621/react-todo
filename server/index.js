const express = require('express')
const todoRoutes = require('./routes/todoRoutes')
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const dotenv = require('dotenv')
const app = express()
const port = 3000

dotenv.config();

app.use(cors());
app.use(express.json())
app.use("/todos", todoRoutes)
app.use("/auth", authRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})