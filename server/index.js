const express = require("express");

const PORT = 5000;

const app = express(); // создадим объект вызвав f-ю express. Запуск приложения

// app.listen([port[, host[, backlog]]][, callback])
// Binds and listens for connections on the specified host and port. This method is identical to Node’s http.Server.listen().
app.listen(PORT, () => console.log("Server started on port ", PORT));
