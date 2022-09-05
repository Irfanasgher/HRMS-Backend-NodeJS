module.exports = (app) => {
  const city = require("../controllers/department_defination.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/findByCompanyId/:id", city.findByCompanyId);
  router.get("/findById/:id", city.findById);
  router.get("/findAll", city.findAll);
  router.get("/findDeptDetail", city.findAllDetail);
  router.get("/findAllForEmp", city.findAllForEmp);
  router.put("/updateByid/:id", city.updatedept);
  router.put("/disableById/:id", city.disable);
  router.put("/enableById/:id", city.enable);

  app.use("/api/department_defination", router);
};
