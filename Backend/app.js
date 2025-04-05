require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

const connectToDb = require("./db/db");

connectToDb();

const userRoute = require("./routes/user.routes");
const workerRoute = require("./routes/worker.routes");
const adminRoute = require("./routes/admin.routes");
const messageRoute = require("./routes/message.routes");
const aiRoute = require("./routes/ai.routes");

app.use(cors({ origin: "*", credentials: true }));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/serviceconnect/admin", adminRoute);
app.use("/serviceconnect/user", userRoute);
app.use("/serviceconnect/worker", workerRoute);
app.use("/serviceconnect/message", messageRoute);
app.use("/serviceconnect/ai", aiRoute);

module.exports = app;
