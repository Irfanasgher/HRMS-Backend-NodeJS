module.exports = (app) => {
  const city = require("../controllers/designation_defination.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByCompanyId/:id", city.findByCompanyId);
  router.get("/findById/:id", city.findById);
  router.get("/findAll", city.findAll);
  router.get("/getDesignations", city.forEmp);
  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/designation_defination", router);
};
