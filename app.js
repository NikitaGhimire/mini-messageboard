//importing modules
require("dotenv").config();
const express = require("express");
const path = require("path");
const pool = require("./db/pool");
const homeRouter = require("./routes/home");
const router = require("./routes/index");

//initialising express app
const app = express();

//setting view engine to ejs
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//Middleware to parse URL encoded bodies
app.use(express.urlencoded({ extended: true }));

//serve static files from public directory
app.use(express.static(path.join(__dirname, "public")));

//make the pool available to routes
app.use((req, res, next) => {
  req.pool = pool;
  next();
});

//define routes
app.use("/", homeRouter);
app.use("/message", router);

//start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
