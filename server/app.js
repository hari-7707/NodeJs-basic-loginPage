const express = require("express");
const path = require("path");
const app = express();
const authenticateRoutes = require("./api/authenticate");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dbConnectionURL =
  "mongodb+srv://gopichandreddy001:esaqlC9S7id7iOch@cluster0.6q8pxzh.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(dbConnectionURL);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
  }
  next();
});
app.use("/authenticate", authenticateRoutes);
app.use("/", (req, res, next) => {
  res.sendFile(path.join(__dirname + "/client", "public", "index.html"));
});
app.use((req, res, next) => {
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
