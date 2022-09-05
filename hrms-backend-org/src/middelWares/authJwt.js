const jwt = require("jsonwebtoken");
const tokenData = require("../../config/authConfig");

const accessTokenSecret = tokenData.secret;
const authenticateJWT = (req, res, next) => {
  const auth = req.headers["auth-token"];

  if (auth) {
    jwt.verify(auth, accessTokenSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      next();
    });
  } else {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};
exports.authenticateJWT = authenticateJWT;
