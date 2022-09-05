module.exports = (app) => {
  const city = require("../controllers/mapping_department_locaiton");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByCompanyId/:id", city.findByCompanyId);

  router.put("/updateByid/:id", city.update);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/mapping_department_locaiton", router);
};
