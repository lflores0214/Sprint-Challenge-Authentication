/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (authorization) {
    const secret = process.env.JWT_SECRET || "Secret Squirrel";

    jwt.verify(authorization, secret, function(error, token) {
      if (error) {
        res.status(401).json({
          message: "Invalid Token"
        });
      } else {
        req.token = token;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "please login and try again"
    });
  }
};
