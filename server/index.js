//The dotenv is a zero-dependency module that loads environment variables from a .env file into process.env.
require("dotenv").config();
const express = require("express");

const PORT = process.env.PORT || 5000; // PORT from .env file

const app = express(); // создадим объект вызвав f-ю express. Запуск приложения

// app.listen([port[, host[, backlog]]][, callback])
// Binds and listens for connections on the specified host and port. This method is identical to Node’s http.Server.listen().
app.listen(PORT, () => console.log("Server started on port ", PORT));
