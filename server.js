const serverless = require("serverless-http");
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const logger = require("./middlewares/logger");

const app = express();
dotenv.config({ path: "./config/config.env" });
const url = `mongodb+srv://admin:${process.env.PASSWORD}@cluster0.ba9sg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose
  .connect(url, connectionParams)
  .then(() => {
    console.log("Connected to database");
    app.use(logger);
    app.use(express.json());
    app.use("/user", userRouter);
  })
  .catch((err) => {
    console.error(`Error connecting to the database. \n${err}`);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.PORT}`));
// module.exports.handler = serverless(app);
