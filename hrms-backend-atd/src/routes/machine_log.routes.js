module.exports = (app) => {
  const city = require("../controllers/machine_log.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findAll", city.findAll);
  router.get("/findByEmployeeId/:id", city.findByEmpId);

  router.put("/updateByid/:id", city.update);

  app.use("/api/machine_log", router);
};
