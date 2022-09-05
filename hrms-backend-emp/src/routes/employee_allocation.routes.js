module.exports = (app) => {
  const city = require("../controllers/employee_allocation.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  router.post("/", city.create);
  router.get("/getAllGrades", city.findGradeCount);
  router.get("/findByEmployeeId/:id", city.findById);
  router.get("/findCountforcompany/:name/:id", city.findCountforcompany);
  router.get("/findAll", city.findall);
  router.put("/updateById/:id", city.updateById);
  router.put("/disableById/:id", city.disableById);
  router.put("/enableById/:id", city.enableById);

  app.use("/api/employee_allocation", router);
};
