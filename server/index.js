//The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();
const express = require("express");
const sequelize = require("./db");
const models = require("./models/models");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const router = require("./routes/index");
const errorHandler = require("./middleware/ErrorHandlingMiddleware");

const PORT = process.env.PORT || 5000; // PORT from .env file

const app = express(); // создадим объект вызвав f-ю express. Запуск приложения

app.use(cors()); // Mounts the specified middleware function or functions at the specified path: the middleware function is executed when the base of the requested path matches path.
app.use(express.json());
app.use("/api", router);
app.use(fileUpload({}));
// middleware that works with errors must be called at the end
app.use(errorHandler);

const start = async () => {
  try {
    await sequelize.authenticate(); // .authenticate method connects to the database
    await sequelize.sync(); // The Sequelize instance method sync() is used to synchronize your Sequelize model with your database tables.
    /**
    app.listen([port[, host[, backlog]]][, callback])
    Binds and listens for connections on the specified host and port. This method is identical to Node’s http.Server.listen().
     */
    app.listen(PORT, () => console.log("Server started on port ", PORT));
  } catch (e) {
    console.log("Error ", e);
  }
};

start();
