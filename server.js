const express = require("express")
const PORT = process.env.PORT || 5000;
const server = express();
const cors = require("cors")
const bodyParser = require('body-parser')
const connectDB = require("./config/db");
const dotenv = require('dotenv')
const helmet = require("helmet")

server.use(bodyParser.urlencoded({ extended: false }))
server.use(express.json())

// cors settig for resource sharing(For Security )
// only localhost:300 is allowed to send request
// only Get,Post ,Delete, Update, Put methods are allowed
server.use(cors({

    origin: ["http://localhost:3000"],
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT']
}));

//  using helment to set various HTTP headers(For Security)
server.use(helmet())

// load env variables
dotenv.config({ path: "./config/config.env" });


// Connect with database
connectDB();


// Route Files
const category = require("./routes/category");
const car = require("./routes/car");
const auth = require("./routes/auth");

// mount route 
server.use("/api/v1/auth", auth)
server.use("/api/v1/category", category)
server.use("/api/v1/car", car)





server.listen(PORT,
    console.log(`The server is running on port: ${process.env.PORT}`)
)


server.get("/", (req, res) => {
    res.send("The RopeStam app is live !");
})







