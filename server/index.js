const express = require("express");

const PORT = 5000;

const app = express(); // создадим объект вызвав f-ю express. Запуск приложения

app.listen(PORT, () => console.log("Server started on port ", PORT));
