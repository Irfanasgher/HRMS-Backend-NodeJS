module.exports = (app) => {
  const city = require("../controllers/attendence.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findAll", city.findAll);
  router.get("/findByEmployeeId/:id", city.findByEmpId);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/attendence", router);
};
