const express = require("express");
const app = express();

//middleware
const cors = require("cors");

//src
const routes = require("./src/routes");
const db = require("./src/models");

//config
require("dotenv").config();

var corsOptions = {
  origin: `http://${HOST}:${PORT}` || "http://localhost:8080",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//using routes
app.use("/user", routes.userRoute);
app.use("/auth", routes.authRoute);

// sample route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to AMMP application." });
});

// set port, listen for requests
const APP_PORT = PORT || 8085;
const APP_HOST = HOST || "localhost";


app.listen(APP_PORT, () => {
  console.log(`Server is running on ${APP_HOST}:${APP_PORT}.`);
});

db.mongoose
  .connect(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established with db");
  })
  .catch((error) => {
    console.log("ERROR: cannot connect to db: ", error);
    process.exit();
  });