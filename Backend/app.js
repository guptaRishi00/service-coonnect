require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const connectToDb = require("./db/db");

connectToDb();

const userRoute = require("./routes/user.routes");
const workerRoute = require("./routes/worker.routes");

app.use(
  cors({ origin: "https://service-coonnect.vercel.app", credentials: true })
);
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/serviceconnect/user", userRoute);
app.use("/serviceconnect/worker", workerRoute);

module.exports = app;
