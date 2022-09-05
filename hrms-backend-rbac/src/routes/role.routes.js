module.exports = (app) => {
  const city = require("../controllers/role.contoller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.createRole);
  router.get("/findAll", city.findAll);

  router.put("/update/:id", city.update);

  app.use("/api/role", router);
};
