module.exports = (app) => {
  const user = require("../controllers/user.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();
  router.get("/verify", authJwt.authenticateJWT, user.verify);

  router.post("/login", user.LoginVerify);
  // router.get("/findUser/:id", authJwt.authenticateJWT, user.findUser);

  app.use("/api/user", router);
};
