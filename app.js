const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const http = require("http")
const user = require("./routes/users")
const index = require("./routes/index")
const app = express()
const server = http.createServer(app)

app.use(cors())
app.use(express.json())
dotenv.config()

require("./config/db")

app.use("/user", user)
app.use("/index", index)


server.listen(process.env.PORT, () => {
  console.log(`server connected ${process.env.PORT}`);
})
