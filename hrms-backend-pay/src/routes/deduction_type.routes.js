module.exports = (app) => {
  const city = require("../controllers/deduction_type.controller");
  const authJwt = require("../middelWares/authJwt");

  var router = require("express").Router();

  //   router.post("/", city.createPeriodPayment);
  router.get("/findAll", city.findAll);
  router.get("/findForDropDown", city.findAllforDropDown);
  // router.get("/findByCityId/:id", city.findByCityId);
  // router.put("/updateCityByid/:id", city.updateCityById);
  // router.put("/disableById/:id", city.disableCityById);
  // router.put("/enableById/:id", city.enableCityById);

  app.use("/api/deduction_type", router);
};
