module.exports = (app) => {
  const city = require("../controllers/asset_detail.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByCompanyId/:id", city.findByCompanyId);
  router.get("/findAll", city.findAll);
  router.get("/EmpModule/:id", city.forEmpModule);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/asset_detail", router);
};
