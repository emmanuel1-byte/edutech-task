const { JsonWebTokenError, TokenExpiredError } = require("jsonwebtoken");

function globalErrorHanlder(err, req, res, next) {
  console.error(`${err.stack}\n${err.message}`);

  if (err instanceof TokenExpiredError) {
    return res.status(401).json({ message: "Token expired" });
  } else if (err instanceof JsonWebTokenError) {
    return res.status(400).json({ message: "Invalid Token" });
  }
  return res.status(500).json({ message: "Internal Server Error" });
}

function routeNotFoundHandler(req, res) {
  res
    .status(404)
    .json({ message: "The requested Endpoint does not exist on this Server" });
}

module.exports = { globalErrorHanlder, routeNotFoundHandler };
