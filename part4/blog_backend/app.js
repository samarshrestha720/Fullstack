const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./utils/config");
const { info, error } = require("./utils/logger");
const blogsRouter = require("./controllers/blogs");

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    info("connected to MongoDB");
  })
  .catch((error) => {
    info("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsRouter);

module.exports = app;
