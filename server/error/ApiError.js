class ApiError extends Error {
  constructor(status, message) {
    super(); // вызов родительского конструктора
    this.status = status;
    this.message = message;
  }

  static badRequiest(message) {
    // статические функции - это фукнции которые можно вызывать без создания объекта.  this === ApiError
    // Можем обращаться к самому классу и вызывать ту или иную функцию
    return new ApiError(404, message);
  }

  static internal(message) {
    return new ApiError(500, message);
  }

  static forbidden(message) {
    return new ApiError(403, message);
  }
}

module.exports = ApiError;
