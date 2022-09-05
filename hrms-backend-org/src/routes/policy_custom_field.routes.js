module.exports = (app) => {
  const city = require("../controllers/policy_custom_field.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);

  app.use("/api/policy_custom_field", router);
};
