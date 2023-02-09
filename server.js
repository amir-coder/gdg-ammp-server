const express = require("express");
const app = express();
const authRoute = require('./src/routes/auth.route')
const userRoute =require('./src/routes/user.route')
const projectRoute = require('./src/routes/Project.route')
const eventRoute = require('./src/routes/Event.route')

//middleware
const cors = require("cors");



//src
const routes = require("./src/routes");
const db = require("./src/models");



//config
// require("dotenv").config();
require("dotenv").config({ path: './src/Config/.env' });
// const dotenv =require('dotenv')
// dotenv.config()



var corsOptions = {
  origin: `http://${process.env.HOST}:${process.env.PORT}` || "http://localhost:8080",
  
};




app.use(cors(corsOptions));




// parse requests of content-type - application/json
app.use(express.json());




// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));





//using routes
app.use("/user", userRoute);
app.use("/auth", authRoute);
app.use("/project", projectRoute);
app.use("/event", eventRoute);






// sample route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AMMP application." });
});





// set port, listen for requests
const APP_PORT = process.env.PORT || 8085;
const APP_HOST = process.env.HOST || "localhost";





db.mongoose
  // .connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {
  .connect(`mongodb://localhost:27017/ammp_db`, {
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established with db",process.env.DB_NAME))
  .catch((error) => {
    console.log("ERROR: cannot connect to db: ", error);
    process.exit();
  
  });


// server
app.listen(APP_PORT, () => {
  console.log(`Server is running on ${APP_HOST}:${APP_PORT}.`);
});


