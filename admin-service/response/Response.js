class Response {
  static success(request, h, status, data, message) {
    return h.response({
      status,
      message,
      data,
    }).code(status);
  }

  static error(request, h, status, data, message,details) {
    return h.response({
      status,
      message,
      data,
      details
    }).code(status);
  }
}

module.exports = Response;
